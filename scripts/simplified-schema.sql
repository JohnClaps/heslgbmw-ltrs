-- Simplified schema without blockchain integration

-- Drop existing tables if they exist
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table with fields for all user types
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'employer', 'institution', 'admin')),
  active BOOLEAN DEFAULT false,
  
  -- Student specific fields
  student_id VARCHAR(100),
  
  -- Institution specific fields
  institution_name VARCHAR(255),
  
  -- Employer specific fields
  employer_name VARCHAR(255),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loans table
CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(15, 2) NOT NULL,
  remaining_amount DECIMAL(15, 2),
  term INTEGER NOT NULL, -- in months
  interest_rate DECIMAL(5, 2) NOT NULL DEFAULT 5.0,
  purpose VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'Completed', 'Rejected')),
  start_date TIMESTAMP WITH TIME ZONE,
  last_payment_date TIMESTAMP WITH TIME ZONE,
  
  -- References to other entities
  institution_id INTEGER REFERENCES users(id),
  employer_id INTEGER REFERENCES users(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table (simplified)
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loans(id),
  amount DECIMAL(15, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Payment', 'Disbursement')),
  payment_method VARCHAR(100),
  account_number VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loans(id),
  name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  document_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active);
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_transactions_loan_id ON transactions(loan_id);
CREATE INDEX idx_documents_loan_id ON documents(loan_id);

-- Insert sample data for testing
INSERT INTO users (name, email, password_hash, role, active, student_id) VALUES
('John Doe', 'john.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', false, 'STU001'),
('Jane Smith', 'jane.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', false, 'STU002'),
('Tech Corp', 'admin@techcorp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer', false, null),
('University ABC', 'admin@universityabc.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'institution', false, null),
('Loan Admin', 'admin@loanbank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true, null);

-- Insert sample loans for testing
INSERT INTO loans (user_id, amount, remaining_amount, term, purpose, status, start_date) VALUES
(1, 10000.00, 8500.00, 24, 'Education', 'Active', NOW() - INTERVAL '3 months'),
(2, 5000.00, 4200.00, 12, 'Books and Supplies', 'Active', NOW() - INTERVAL '2 months');

-- Insert sample transactions
INSERT INTO transactions (loan_id, amount, type, payment_method, account_number) VALUES
(1, 500.00, 'Payment', 'bank_transfer', '****1234'),
(1, 500.00, 'Payment', 'bank_transfer', '****1234'),
(1, 500.00, 'Payment', 'bank_transfer', '****1234'),
(2, 400.00, 'Payment', 'debit_card', '****5678'),
(2, 400.00, 'Payment', 'debit_card', '****5678');

-- Set remaining_amount to equal amount for new loans
CREATE OR REPLACE FUNCTION set_remaining_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.remaining_amount IS NULL THEN
    NEW.remaining_amount := NEW.amount;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_remaining_amount
  BEFORE INSERT ON loans
  FOR EACH ROW
  EXECUTE FUNCTION set_remaining_amount();

-- Note: All sample passwords are hashed version of "password123"
-- You can use these credentials to test:
-- john.student@example.com / password123
-- jane.student@example.com / password123
-- admin@techcorp.com / password123
-- admin@universityabc.edu / password123
-- admin@loanbank.com / password123
