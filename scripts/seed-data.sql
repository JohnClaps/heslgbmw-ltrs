-- Student-LTRS Seed Data
-- Test data for development and demonstration

-- Insert test institutions
INSERT INTO institutions (name, code, type, address, phone_number, email, website, established_year, total_students) VALUES
('University of Malawi', 'UNIMA', 'University', 'P.O. Box 278, Zomba', '+265-1-524-222', 'info@unima.ac.mw', 'https://www.unima.ac.mw', 1965, 15000),
('Malawi University of Science and Technology', 'MUST', 'University', 'P.O. Box 5196, Limbe', '+265-1-477-000', 'info@must.ac.mw', 'https://www.must.ac.mw', 2012, 8000),
('Lilongwe University of Agriculture and Natural Resources', 'LUANAR', 'University', 'P.O. Box 219, Lilongwe', '+265-1-277-364', 'info@luanar.ac.mw', 'https://www.luanar.ac.mw', 2011, 6000),
('Malawi Polytechnic', 'POLY', 'Polytechnic', 'Private Bag 303, Chichiri, Blantyre 3', '+265-1-870-411', 'info@poly.ac.mw', 'https://www.poly.ac.mw', 1965, 4000),
('Mzuzu University', 'MZUNI', 'University', 'Private Bag 201, Mzuzu 2', '+265-1-320-775', 'info@mzuni.ac.mw', 'https://www.mzuni.ac.mw', 1997, 7000);

-- Insert test programs
INSERT INTO programs (institution_id, name, code, department, level, duration_years, tuition_fee_per_year, capacity, requirements) VALUES
(1, 'Bachelor of Science in Information and Communication Technology', 'BICT', 'Computer Science', 'Degree', 4, 850000, 100, 'MSCE with Mathematics and Physics'),
(1, 'Bachelor of Commerce', 'BCOM', 'Commerce', 'Degree', 4, 750000, 150, 'MSCE with Mathematics'),
(2, 'Bachelor of Engineering in Civil Engineering', 'BE-CIVIL', 'Engineering', 'Degree', 5, 950000, 80, 'MSCE with Mathematics, Physics, and Chemistry'),
(2, 'Bachelor of Science in Information Technology', 'BSC-IT', 'Information Technology', 'Degree', 4, 800000, 120, 'MSCE with Mathematics'),
(3, 'Bachelor of Science in Agriculture', 'BSC-AGR', 'Agriculture', 'Degree', 4, 700000, 200, 'MSCE with Biology and Chemistry'),
(4, 'Diploma in Mechanical Engineering', 'DIP-MECH', 'Engineering', 'Diploma', 3, 600000, 60, 'MSCE with Mathematics and Physics'),
(5, 'Bachelor of Education', 'BED', 'Education', 'Degree', 4, 650000, 180, 'MSCE with relevant subjects');

-- Insert test users (password for all is 'password123')
INSERT INTO users (name, email, password_hash, role, active, student_id, phone_number, date_of_birth, institution_name, employer_name) VALUES
-- Students
('John Banda', 'john.student@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'UNIMA/2023/001', '+265-999-123-456', '2000-05-15', NULL, NULL),
('Mary Phiri', 'mary.phiri@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'MUST/2023/002', '+265-888-234-567', '1999-08-22', NULL, NULL),
('Peter Mwale', 'peter.mwale@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'LUANAR/2023/003', '+265-777-345-678', '2001-03-10', NULL, NULL),
('Grace Tembo', 'grace.tembo@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'POLY/2023/004', '+265-666-456-789', '2000-11-28', NULL, NULL),
('James Nyirenda', 'james.nyirenda@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', true, 'MZUNI/2023/005', '+265-555-567-890', '1998-07-14', NULL, NULL),

-- Admins/Lenders
('Admin User', 'admin@loanbank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true, NULL, '+265-111-111-111', NULL, NULL, NULL),
('Sarah Kachale', 'sarah.admin@loanbank.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true, NULL, '+265-222-222-222', NULL, NULL, NULL),

-- Employers
('TechCorp Admin', 'admin@techcorp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer', true, NULL, '+265-333-333-333', NULL, NULL, 'TechCorp Malawi'),
('Standard Bank HR', 'hr@standardbank.mw', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer', true, NULL, '+265-444-444-444', NULL, NULL, 'Standard Bank Malawi'),
('Airtel Malawi HR', 'careers@airtel.mw', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer', true, NULL, '+265-555-555-555', NULL, NULL, 'Airtel Malawi'),

-- Institutions
('UNIMA Admin', 'admin@universityabc.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'institution', true, NULL, '+265-666-666-666', NULL, 'University of Malawi', NULL),
('MUST Admin', 'admin@must.ac.mw', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'institution', true, NULL, '+265-777-777-777', NULL, 'Malawi University of Science and Technology', NULL);

-- Insert student enrollments
INSERT INTO student_enrollments (student_id, program_id, institution_id, enrollment_date, current_year, gpa, status) VALUES
(1, 1, 1, '2023-09-01', 2, 3.45, 'Active'),
(2, 4, 2, '2023-09-01', 2, 3.78, 'Active'),
(3, 5, 3, '2023-09-01', 2, 3.22, 'Active'),
(4, 6, 4, '2023-09-01', 2, 3.56, 'Active'),
(5, 7, 5, '2023-09-01', 2, 3.89, 'Active');

-- Insert test loans
INSERT INTO loans (user_id, program_id, institution_id, amount, remaining_amount, term, interest_rate, purpose, status, application_date, approval_date, disbursement_date, start_date, approved_by) VALUES
(1, 1, 1, 1500000, 1200000, 48, 5.0, 'Tuition fees for Computer Science degree', 'Active', '2023-08-15', '2023-08-20', '2023-09-01', '2023-09-01', 6),
(2, 4, 2, 1800000, 1800000, 60, 4.5, 'Tuition and accommodation for IT degree', 'Active', '2023-08-10', '2023-08-18', '2023-09-01', '2023-09-01', 6),
(3, 5, 3, 1200000, 900000, 36, 5.5, 'Agriculture degree funding', 'Active', '2023-08-12', '2023-08-22', '2023-09-01', '2023-09-01', 7),
(4, 6, 4, 800000, 600000, 30, 6.0, 'Mechanical Engineering diploma', 'Active', '2023-08-08', '2023-08-25', '2023-09-01', '2023-09-01', 6),
(5, 7, 5, 1000000, 1000000, 42, 4.8, 'Education degree with living expenses', 'Pending', '2024-01-15', NULL, NULL, NULL, NULL);

-- Generate payment schedules for active loans
SELECT generate_payment_schedule(1);
SELECT generate_payment_schedule(2);
SELECT generate_payment_schedule(3);
SELECT generate_payment_schedule(4);

-- Insert some test transactions
INSERT INTO transactions (loan_id, user_id, amount, type, payment_method, reference_number, status, processed_at) VALUES
(1, 1, 50000, 'Payment', 'TNM_Mpamba', 'TNM123456789', 'Completed', '2023-10-01 10:30:00'),
(1, 1, 50000, 'Payment', 'Airtel_Money', 'AM987654321', 'Completed', '2023-11-01 14:15:00'),
(2, 2, 60000, 'Payment', 'Bank_Transfer', 'BT456789123', 'Completed', '2023-10-15 09:45:00'),
(3, 3, 45000, 'Payment', 'TNM_Mpamba', 'TNM555666777', 'Completed', '2023-10-20 16:20:00'),
(4, 4, 35000, 'Payment', 'Debit_Card', 'DC789123456', 'Completed', '2023-11-05 11:30:00');

-- Update payment schedules to mark some as paid
UPDATE payment_schedules SET 
    paid = true, 
    paid_date = '2023-10-01', 
    paid_amount = total_amount,
    transaction_id = 1
WHERE loan_id = 1 AND payment_number = 1;

UPDATE payment_schedules SET 
    paid = true, 
    paid_date = '2023-11-01', 
    paid_amount = total_amount,
    transaction_id = 2
WHERE loan_id = 1 AND payment_number = 2;

-- Insert test sponsorships
INSERT INTO sponsorships (employer_id, student_id, loan_id, amount, status, start_date, employment_commitment_months, terms_and_conditions) VALUES
(8, 1, 1, 500000, 'Active', '2023-09-01', 24, 'Student agrees to work for TechCorp for 2 years after graduation'),
(9, 2, 2, 750000, 'Active', '2023-09-01', 36, 'Student agrees to work for Standard Bank for 3 years after graduation'),
(10, 5, NULL, 400000, 'Pending', NULL, 24, 'Conditional offer pending loan approval');

-- Insert test notifications
INSERT INTO notifications (user_id, title, message, type, priority, loan_id) VALUES
(1, 'Payment Due Reminder', 'Your loan payment of MK 52,500 is due on 2024-01-01', 'payment_due', 'normal', 1),
(2, 'Loan Approved', 'Congratulations! Your loan application has been approved', 'loan_approved', 'high', 2),
(3, 'Payment Received', 'We have received your payment of MK 45,000', 'payment_received', 'normal', 3),
(5, 'Application Under Review', 'Your loan application is currently under review', 'application_status', 'normal', 5);

-- Insert test documents
INSERT INTO documents (loan_id, user_id, name, type, file_path, verified) VALUES
(1, 1, 'National ID Copy', 'ID_Copy', '/documents/john_banda_id.pdf', true),
(1, 1, 'UNIMA Enrollment Letter', 'Enrollment_Letter', '/documents/john_banda_enrollment.pdf', true),
(2, 2, 'Academic Transcript', 'Academic_Transcript', '/documents/mary_phiri_transcript.pdf', true),
(3, 3, 'Bank Statement', 'Bank_Statement', '/documents/peter_mwale_bank.pdf', false),
(5, 5, 'Income Statement', 'Income_Statement', '/documents/james_nyirenda_income.pdf', false);

-- Update loan remaining amounts based on payments
UPDATE loans SET remaining_amount = amount - 100000 WHERE id = 1; -- John paid 2 installments
UPDATE loans SET remaining_amount = amount - 60000 WHERE id = 2;  -- Mary paid 1 installment
UPDATE loans SET remaining_amount = amount - 45000 WHERE id = 3;  -- Peter paid 1 installment
UPDATE loans SET remaining_amount = amount - 35000 WHERE id = 4;  -- Grace paid 1 installment

-- Insert some audit log entries
INSERT INTO audit_logs (user_id, user_email, user_role, action, entity_type, entity_id, new_values) VALUES
(6, 'admin@loanbank.com', 'admin', 'INSERT', 'loans', 1, '{"status": "Active", "amount": 1500000}'),
(6, 'admin@loanbank.com', 'admin', 'UPDATE', 'loans', 1, '{"status": "Active", "approved_by": 6}'),
(1, 'alexinardsimbeye@gmail.com', 'student', 'INSERT', 'transactions', 1, '{"amount": 50000, "type": "Payment"}');

-- Create some overdue payments for testing
UPDATE payment_schedules SET 
    due_date = CURRENT_DATE - INTERVAL '10 days',
    days_overdue = 10,
    penalty_amount = 5000
WHERE loan_id = 3 AND payment_number = 2 AND paid = false;

-- Summary statistics (for reference)
-- Total loans: 5 (4 active, 1 pending)
-- Total loan amount: MK 6,300,000
-- Total payments made: MK 240,000
-- Active sponsorships: 2
-- Students with loans: 5
-- Institutions: 5
-- Programs: 7
