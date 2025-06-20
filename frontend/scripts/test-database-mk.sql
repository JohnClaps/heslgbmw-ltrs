-- Test database with Malawian data and MK currency

-- Drop existing tables if they exist
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table with Malawian test data
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

-- Create loans table with MK amounts
CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(15, 2) NOT NULL, -- Amount in MK
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

-- Create transactions table with PayChangu support
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loans(id),
  amount DECIMAL(15, 2) NOT NULL, -- Amount in MK
  type VARCHAR(50) NOT NULL CHECK (type IN ('Payment', 'Disbursement')),
  payment_method VARCHAR(100), -- airtel_money, tnm_mpamba, bank_transfer, debit_card
  account_number VARCHAR(100),
  paychangu_transaction_id VARCHAR(255),
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

-- Insert Malawian test users
INSERT INTO users (name, email, password_hash, role, active, student_id, institution_name, employer_name) VALUES
-- Students
('Chisomo Banda', 'john.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'UNIMA/2023/001', null, null),
('Thandiwe Mwale', 'jane.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'MZUNI/2023/002', null, null),
('Mphatso Phiri', 'mphatso.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'LUANAR/2023/003', null, null),
('Grace Tembo', 'grace.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'MUST/2023/004', null, null),

-- Employers
('Airtel Malawi', 'admin@techcorp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer', true, null, null, 'Airtel Malawi'),
('Standard Bank Malawi', 'employer@standardbank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer', true, null, null, 'Standard Bank Malawi'),

-- Institutions
('University of Malawi', 'admin@universityabc.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'institution', true, null, 'University of Malawi', null),
('Mzuzu University', 'admin@mzuni.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'institution', true, null, 'Mzuzu University', null),

-- Admin/Lenders
('FDH Bank', 'admin@loanbank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true, null, null, null),
('National Bank of Malawi', 'admin@nbm.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true, null, null, null);

-- Insert sample loans with MK amounts
INSERT INTO loans (user_id, amount, remaining_amount, term, purpose, status, start_date) VALUES
(1, 500000.00, 425000.00, 24, 'Tuition Fees', 'Active', NOW() - INTERVAL '3 months'),
(2, 250000.00, 210000.00, 12, 'Books and Supplies', 'Active', NOW() - INTERVAL '2 months'),
(1, 750000.00, 750000.00, 36, 'Accommodation', 'Pending', NOW()),
(3, 300000.00, 270000.00, 18, 'Research Materials', 'Active', NOW() - INTERVAL '1 month'),
(4, 400000.00, 400000.00, 24, 'Laboratory Equipment', 'Pending', NOW());

-- Insert sample transactions with PayChangu methods
INSERT INTO transactions (loan_id, amount, type, payment_method, account_number, paychangu_transaction_id) VALUES
(1, 25000.00, 'Payment', 'airtel_money', '+265991234567', 'PCU-TXN-001'),
(2, 20000.00, 'Payment', 'tnm_mpamba', '+265888765432', 'PCU-TXN-002'),
(1, 25000.00, 'Payment', 'bank_transfer', 'NBM-1234567890', 'PCU-TXN-003'),
(4, 15000.00, 'Payment', 'airtel_money', '+265997654321', 'PCU-TXN-004'),
(1, 25000.00, 'Payment', 'debit_card', '****1234', 'PCU-TXN-005');

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

-- Test credentials (all passwords are "password123"):
-- Students:
--   john.student@example.com (Chisomo Banda - UNIMA/2023/001)
--   jane.student@example.com (Thandiwe Mwale - MZUNI/2023/002)
--   mphatso.student@example.com (Mphatso Phiri - LUANAR/2023/003)
--   grace.student@example.com (Grace Tembo - MUST/2023/004)
-- 
-- Employers:
--   admin@techcorp.com (Airtel Malawi)
--   employer@standardbank.com (Standard Bank Malawi)
-- 
-- Institutions:
--   admin@universityabc.edu (University of Malawi)
--   admin@mzuni.edu (Mzuzu University)
-- 
-- Admins:
--   admin@loanbank.com (FDH Bank)
--   admin@nbm.com (National Bank of Malawi)
