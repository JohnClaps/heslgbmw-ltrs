-- Student-LTRS Complete Database Schema
-- Loan Tracking & Repayment System for Educational Institutions

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'institution', 'employer', 'admin');
CREATE TYPE loan_status AS ENUM ('Pending', 'Active', 'Completed', 'Rejected', 'Defaulted');
CREATE TYPE transaction_type AS ENUM ('Payment', 'Disbursement', 'Fee', 'Interest', 'Penalty');
CREATE TYPE payment_method AS ENUM ('TNM_Mpamba', 'Airtel_Money', 'Bank_Transfer', 'Debit_Card', 'Credit_Card');
CREATE TYPE sponsorship_status AS ENUM ('Active', 'Completed', 'Cancelled', 'Pending');
CREATE TYPE document_type AS ENUM ('ID_Copy', 'Academic_Transcript', 'Enrollment_Letter', 'Income_Statement', 'Bank_Statement', 'Other');

-- Users table - Core user management
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role user_role NOT NULL DEFAULT 'student',
    active BOOLEAN DEFAULT FALSE,
    
    -- Student specific fields
    student_id VARCHAR(100),
    date_of_birth DATE,
    phone_number VARCHAR(20),
    address TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    
    -- Institution specific fields
    institution_name VARCHAR(255),
    institution_code VARCHAR(50),
    institution_type VARCHAR(100),
    
    -- Employer specific fields
    employer_name VARCHAR(255),
    company_registration_number VARCHAR(100),
    industry VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone_number ~* '^\+?[0-9\s\-$$$$]{8,20}$')
);

-- Institutions table - Educational institutions
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(100) NOT NULL, -- University, College, Technical, etc.
    address TEXT,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    established_year INTEGER,
    accreditation_status VARCHAR(100),
    total_students INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs table - Academic programs offered by institutions
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    department VARCHAR(255),
    level VARCHAR(50) NOT NULL, -- Certificate, Diploma, Degree, Masters, PhD
    duration_years DECIMAL(2,1) NOT NULL,
    tuition_fee_per_year DECIMAL(15,2) NOT NULL,
    capacity INTEGER,
    current_enrollment INTEGER DEFAULT 0,
    requirements TEXT,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(institution_id, code)
);

-- Student enrollments table - Links students to programs
CREATE TABLE student_enrollments (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL,
    expected_graduation_date DATE,
    current_year INTEGER DEFAULT 1,
    current_semester INTEGER DEFAULT 1,
    gpa DECIMAL(3,2),
    status VARCHAR(50) DEFAULT 'Active', -- Active, Graduated, Suspended, Withdrawn
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(student_id, program_id)
);

-- Loans table - Core loan management
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id),
    institution_id INTEGER REFERENCES institutions(id),
    
    -- Loan details
    amount DECIMAL(15,2) NOT NULL,
    remaining_amount DECIMAL(15,2),
    term INTEGER NOT NULL, -- in months
    interest_rate DECIMAL(5,2) NOT NULL DEFAULT 5.0,
    purpose TEXT NOT NULL,
    status loan_status DEFAULT 'Pending',
    
    -- Dates
    application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approval_date TIMESTAMP WITH TIME ZONE,
    disbursement_date TIMESTAMP WITH TIME ZONE,
    start_date TIMESTAMP WITH TIME ZONE,
    maturity_date TIMESTAMP WITH TIME ZONE,
    last_payment_date TIMESTAMP WITH TIME ZONE,
    
    -- Additional fields
    approved_by INTEGER REFERENCES users(id),
    disbursed_by INTEGER REFERENCES users(id),
    monthly_payment DECIMAL(15,2),
    total_interest DECIMAL(15,2),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_amount CHECK (amount > 0),
    CONSTRAINT positive_remaining CHECK (remaining_amount >= 0),
    CONSTRAINT valid_term CHECK (term > 0 AND term <= 120), -- Max 10 years
    CONSTRAINT valid_interest_rate CHECK (interest_rate >= 0 AND interest_rate <= 50)
);

-- Transactions table - All financial transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    loan_id INTEGER REFERENCES loans(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    
    -- Transaction details
    amount DECIMAL(15,2) NOT NULL,
    type transaction_type NOT NULL,
    payment_method payment_method,
    reference_number VARCHAR(255),
    external_reference VARCHAR(255), -- Payment gateway reference
    
    -- Payment details
    account_number VARCHAR(100),
    account_name VARCHAR(255),
    bank_name VARCHAR(255),
    phone_number VARCHAR(20),
    
    -- Status and processing
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Completed, Failed, Cancelled
    processed_at TIMESTAMP WITH TIME ZONE,
    failure_reason TEXT,
    
    -- Blockchain/audit trail
    blockchain_tx_id VARCHAR(255),
    block_number INTEGER,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_transaction_amount CHECK (amount > 0)
);

-- Documents table - Document management
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    loan_id INTEGER REFERENCES loans(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Document details
    name VARCHAR(255) NOT NULL,
    type document_type NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    
    -- Verification
    verified BOOLEAN DEFAULT FALSE,
    verified_by INTEGER REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    verification_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsorships table - Employer-student sponsorships
CREATE TABLE sponsorships (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    employer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    loan_id INTEGER REFERENCES loans(id),
    
    -- Sponsorship details
    amount DECIMAL(15,2) NOT NULL,
    monthly_amount DECIMAL(15,2),
    duration_months INTEGER,
    status sponsorship_status DEFAULT 'Pending',
    
    -- Terms and conditions
    terms_and_conditions TEXT,
    employment_commitment_months INTEGER,
    minimum_gpa DECIMAL(3,2),
    
    -- Dates
    start_date DATE,
    end_date DATE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_sponsorship_amount CHECK (amount > 0),
    CONSTRAINT valid_duration CHECK (duration_months > 0)
);

-- Payment schedules table - Loan repayment schedules
CREATE TABLE payment_schedules (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    loan_id INTEGER REFERENCES loans(id) ON DELETE CASCADE,
    
    -- Schedule details
    payment_number INTEGER NOT NULL,
    due_date DATE NOT NULL,
    principal_amount DECIMAL(15,2) NOT NULL,
    interest_amount DECIMAL(15,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    
    -- Payment status
    paid BOOLEAN DEFAULT FALSE,
    paid_date DATE,
    paid_amount DECIMAL(15,2),
    transaction_id INTEGER REFERENCES transactions(id),
    
    -- Late payment tracking
    days_overdue INTEGER DEFAULT 0,
    penalty_amount DECIMAL(15,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table - System notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification details
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- payment_due, loan_approved, etc.
    priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
    
    -- Status
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Optional references
    loan_id INTEGER REFERENCES loans(id),
    transaction_id INTEGER REFERENCES transactions(id),
    
    -- Delivery
    email_sent BOOLEAN DEFAULT FALSE,
    sms_sent BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table - System audit trail
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    
    -- Actor information
    user_id INTEGER REFERENCES users(id),
    user_email VARCHAR(255),
    user_role user_role,
    
    -- Action details
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER,
    
    -- Changes
    old_values JSONB,
    new_values JSONB,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table - Application configuration
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    category VARCHAR(50),
    data_type VARCHAR(20) DEFAULT 'string', -- string, number, boolean, json
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blockchain records table - Blockchain transaction references
CREATE TABLE blockchain_records (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    entity_type VARCHAR(50) NOT NULL, -- Loan, Transaction, Payment
    entity_id INTEGER NOT NULL,
    blockchain_tx_id VARCHAR(255) NOT NULL,
    block_number INTEGER NOT NULL,
    network VARCHAR(50) DEFAULT 'ethereum',
    gas_used INTEGER,
    gas_price DECIMAL(20,0),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(entity_type, entity_id, blockchain_tx_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active);
CREATE INDEX idx_users_student_id ON users(student_id);

CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_institution_id ON loans(institution_id);
CREATE INDEX idx_loans_program_id ON loans(program_id);
CREATE INDEX idx_loans_application_date ON loans(application_date);

CREATE INDEX idx_transactions_loan_id ON transactions(loan_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

CREATE INDEX idx_documents_loan_id ON documents(loan_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(type);

CREATE INDEX idx_sponsorships_employer_id ON sponsorships(employer_id);
CREATE INDEX idx_sponsorships_student_id ON sponsorships(student_id);
CREATE INDEX idx_sponsorships_status ON sponsorships(status);

CREATE INDEX idx_payment_schedules_loan_id ON payment_schedules(loan_id);
CREATE INDEX idx_payment_schedules_due_date ON payment_schedules(due_date);
CREATE INDEX idx_payment_schedules_paid ON payment_schedules(paid);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_type ON notifications(type);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

CREATE INDEX idx_blockchain_records_entity ON blockchain_records(entity_type, entity_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_enrollments_updated_at BEFORE UPDATE ON student_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sponsorships_updated_at BEFORE UPDATE ON sponsorships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_schedules_updated_at BEFORE UPDATE ON payment_schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default system settings
INSERT INTO system_settings (key, value, description, category, data_type) VALUES
('default_interest_rate', '5.0', 'Default interest rate for new loans', 'loans', 'number'),
('max_loan_amount', '5000000', 'Maximum loan amount in MK', 'loans', 'number'),
('min_loan_amount', '50000', 'Minimum loan amount in MK', 'loans', 'number'),
('max_loan_term', '120', 'Maximum loan term in months', 'loans', 'number'),
('payment_grace_period', '7', 'Grace period for late payments in days', 'payments', 'number'),
('late_payment_penalty_rate', '2.0', 'Late payment penalty rate percentage', 'payments', 'number'),
('system_email', 'noreply@student-ltrs.com', 'System email address', 'notifications', 'string'),
('sms_enabled', 'true', 'Enable SMS notifications', 'notifications', 'boolean'),
('email_enabled', 'true', 'Enable email notifications', 'notifications', 'boolean'),
('maintenance_mode', 'false', 'System maintenance mode', 'system', 'boolean');

-- Create views for common queries
CREATE VIEW loan_summary AS
SELECT 
    l.id,
    l.uuid,
    u.name as student_name,
    u.email as student_email,
    u.student_id,
    i.name as institution_name,
    p.name as program_name,
    l.amount,
    l.remaining_amount,
    l.interest_rate,
    l.status,
    l.application_date,
    l.approval_date,
    l.disbursement_date,
    CASE 
        WHEN l.amount > 0 THEN ROUND(((l.amount - COALESCE(l.remaining_amount, l.amount)) / l.amount) * 100, 2)
        ELSE 0 
    END as repayment_progress
FROM loans l
JOIN users u ON l.user_id = u.id
LEFT JOIN institutions i ON l.institution_id = i.id
LEFT JOIN programs p ON l.program_id = p.id;

CREATE VIEW payment_summary AS
SELECT 
    t.id,
    t.uuid,
    l.id as loan_id,
    u.name as student_name,
    t.amount,
    t.type,
    t.payment_method,
    t.status,
    t.reference_number,
    t.created_at as payment_date
FROM transactions t
JOIN loans l ON t.loan_id = l.id
JOIN users u ON l.user_id = u.id
WHERE t.type = 'Payment';

CREATE VIEW sponsorship_summary AS
SELECT 
    s.id,
    s.uuid,
    emp.name as employer_name,
    emp.employer_name as company_name,
    stu.name as student_name,
    stu.student_id,
    s.amount,
    s.status,
    s.start_date,
    s.end_date,
    s.employment_commitment_months
FROM sponsorships s
JOIN users emp ON s.employer_id = emp.id
JOIN users stu ON s.student_id = stu.id;

-- Create functions for common calculations
CREATE OR REPLACE FUNCTION calculate_monthly_payment(
    principal DECIMAL(15,2),
    annual_rate DECIMAL(5,2),
    term_months INTEGER
) RETURNS DECIMAL(15,2) AS $$
DECLARE
    monthly_rate DECIMAL(10,8);
    payment DECIMAL(15,2);
BEGIN
    IF annual_rate = 0 THEN
        RETURN principal / term_months;
    END IF;
    
    monthly_rate := annual_rate / 100 / 12;
    payment := principal * monthly_rate / (1 - POWER(1 + monthly_rate, -term_months));
    
    RETURN ROUND(payment, 2);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_payment_schedule(loan_id_param INTEGER)
RETURNS VOID AS $$
DECLARE
    loan_record RECORD;
    monthly_payment DECIMAL(15,2);
    remaining_balance DECIMAL(15,2);
    payment_date DATE;
    payment_num INTEGER;
    principal_payment DECIMAL(15,2);
    interest_payment DECIMAL(15,2);
    monthly_rate DECIMAL(10,8);
BEGIN
    -- Get loan details
    SELECT * INTO loan_record FROM loans WHERE id = loan_id_param;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Loan not found';
    END IF;
    
    -- Calculate monthly payment
    monthly_payment := calculate_monthly_payment(loan_record.amount, loan_record.interest_rate, loan_record.term);
    monthly_rate := loan_record.interest_rate / 100 / 12;
    
    -- Initialize variables
    remaining_balance := loan_record.amount;
    payment_date := COALESCE(loan_record.start_date::DATE, CURRENT_DATE);
    
    -- Clear existing schedule
    DELETE FROM payment_schedules WHERE loan_id = loan_id_param;
    
    -- Generate payment schedule
    FOR payment_num IN 1..loan_record.term LOOP
        -- Calculate interest and principal for this payment
        interest_payment := remaining_balance * monthly_rate;
        principal_payment := monthly_payment - interest_payment;
        
        -- Adjust last payment if necessary
        IF payment_num = loan_record.term THEN
            principal_payment := remaining_balance;
            monthly_payment := principal_payment + interest_payment;
        END IF;
        
        -- Insert payment schedule record
        INSERT INTO payment_schedules (
            loan_id,
            payment_number,
            due_date,
            principal_amount,
            interest_amount,
            total_amount
        ) VALUES (
            loan_id_param,
            payment_num,
            payment_date,
            principal_payment,
            interest_payment,
            monthly_payment
        );
        
        -- Update remaining balance and next payment date
        remaining_balance := remaining_balance - principal_payment;
        payment_date := payment_date + INTERVAL '1 month';
    END LOOP;
    
    -- Update loan with monthly payment amount
    UPDATE loans SET monthly_payment = monthly_payment WHERE id = loan_id_param;
END;
$$ LANGUAGE plpgsql;

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (
        user_id,
        action,
        entity_type,
        entity_id,
        old_values,
        new_values
    ) VALUES (
        COALESCE(current_setting('app.current_user_id', true)::INTEGER, 0),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to sensitive tables
CREATE TRIGGER audit_loans AFTER INSERT OR UPDATE OR DELETE ON loans FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_transactions AFTER INSERT OR UPDATE OR DELETE ON transactions FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON users FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_sponsorships AFTER INSERT OR UPDATE OR DELETE ON sponsorships FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Grant appropriate permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO student_ltrs_app;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO student_ltrs_app;

-- Comments for documentation
COMMENT ON TABLE users IS 'Core user accounts for all system roles';
COMMENT ON TABLE institutions IS 'Educational institutions in the system';
COMMENT ON TABLE programs IS 'Academic programs offered by institutions';
COMMENT ON TABLE loans IS 'Student loan applications and management';
COMMENT ON TABLE transactions IS 'All financial transactions in the system';
COMMENT ON TABLE sponsorships IS 'Employer-student sponsorship relationships';
COMMENT ON TABLE payment_schedules IS 'Loan repayment schedules';
COMMENT ON TABLE notifications IS 'System notifications for users';
COMMENT ON TABLE audit_logs IS 'Audit trail for system changes';

-- Schema version tracking
INSERT INTO system_settings (key, value, description, category) 
VALUES ('schema_version', '1.0.0', 'Current database schema version', 'system');
