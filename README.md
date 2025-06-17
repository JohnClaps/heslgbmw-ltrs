# Student-LTRS (Loan Tracking & Repayment System)

A comprehensive loan tracking and repayment system designed specifically for students, institutions, employers, and lenders in Malawi. Built with Next.js 15, TypeScript, and PostgreSQL.

## 🎯 Features

### Multi-Stakeholder Platform
- **Students**: Track loans, make payments, view repayment progress
- **Institutions**: Manage student loans, track academic progress
- **Employers**: Sponsor students, track investments, hire graduates
- **Admins/Lenders**: Approve loans, manage users, analytics dashboard

### Payment Integration
- **Mobile Money**: TNM Mpamba, Airtel Money
- **Bank Transfers**: All major Malawian banks
- **Card Payments**: Visa, Mastercard support
- **Real-time Processing**: Instant payment confirmation

### Security & Transparency
- Secure authentication system
- Role-based access control
- Transaction tracking and audit trails
- Data encryption and protection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-org/student-ltrs.git
   cd student-ltrs
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/student_ltrs"
   POSTGRES_URL="postgresql://username:password@localhost:5432/student_ltrs"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Payment Integration (Optional)
   PAYCHANGU_SECRET_KEY="your-paychangu-secret"
   TNM_API_KEY="your-tnm-api-key"
   AIRTEL_API_KEY="your-airtel-api-key"
   \`\`\`

4. **Database Setup**
   
   Create a PostgreSQL database:
   \`\`\`sql
   CREATE DATABASE student_ltrs;
   \`\`\`

5. **Run Database Migrations**
   
   Execute the SQL schema files in order:
   \`\`\`bash
   # Run the main schema
   psql -d student_ltrs -f scripts/complete-schema.sql
   
   # Seed with test data (optional)
   psql -d student_ltrs -f scripts/seed-data.sql
   \`\`\`

6. **Start Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

7. **Access the Application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
student-ltrs/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── employer/          # Employer portal pages
│   ├── institution/       # Institution management pages
│   ├── loans/             # Loan management pages
│   ├── payments/          # Payment processing pages
│   └── settings/          # User settings pages
├── components/            # Reusable React components
│   ├── dashboards/        # Role-specific dashboards
│   ├── payment/           # Payment processing components
│   ├── ui/                # shadcn/ui components
│   └── ...
├── lib/                   # Utility functions and configurations
│   ├── actions.ts         # Server actions
│   ├── auth.ts           # Authentication logic
│   └── db.ts             # Database connection
├── scripts/               # Database scripts
│   ├── complete-schema.sql # Full database schema
│   └── seed-data.sql      # Test data
└── public/               # Static assets
\`\`\`

## 🗄️ Database Schema

The system uses PostgreSQL with the following main tables:

- **users**: User accounts and profiles
- **loans**: Loan applications and details
- **transactions**: Payment and transaction records
- **documents**: Loan-related documents
- **sponsorships**: Employer-student sponsorship records
- **institutions**: Educational institution data
- **programs**: Academic programs and courses

See \`scripts/complete-schema.sql\` for the full schema definition.

## 👥 User Roles & Access

### Student
- View loan status and payment history
- Make payments via multiple methods
- Track repayment progress
- Apply for new loans

### Institution
- Manage student enrollments
- Track academic programs
- Monitor student loan statuses
- Generate institutional reports

### Employer
- Browse sponsorship opportunities
- Sponsor students
- Track sponsored student progress
- Hire graduates

### Admin/Lender
- Approve/reject loan applications
- Manage all users
- View system analytics
- Configure system settings

## 💳 Payment Methods

### Mobile Money
- **TNM Mpamba**: Direct integration with TNM's mobile money service
- **Airtel Money**: Airtel mobile money payments

### Banking
- **Standard Bank Malawi**
- **National Bank of Malawi**
- **FDH Bank**
- **NBS Bank**
- **MyBucks Banking Corporation**

### Cards
- **Visa**: Credit and debit cards
- **Mastercard**: Credit and debit cards

## 🔧 Configuration

### Payment Gateway Setup

1. **TNM Mpamba Integration**
   \`\`\`env
   TNM_API_KEY="your-tnm-api-key"
   TNM_API_SECRET="your-tnm-secret"
   TNM_ENVIRONMENT="sandbox" # or "production"
   \`\`\`

2. **Airtel Money Integration**
   \`\`\`env
   AIRTEL_API_KEY="your-airtel-api-key"
   AIRTEL_CLIENT_ID="your-client-id"
   AIRTEL_CLIENT_SECRET="your-client-secret"
   \`\`\`

### Database Configuration

The application supports both local PostgreSQL and cloud providers:

- **Local PostgreSQL**: Standard connection string
- **Vercel Postgres**: Automatic configuration on Vercel
- **Supabase**: Compatible with Supabase PostgreSQL
- **Neon**: Compatible with Neon PostgreSQL

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Database Setup**
   - Use Vercel Postgres or external provider
   - Run migrations after deployment

3. **Environment Variables**
   \`\`\`env
   DATABASE_URL="your-production-database-url"
   NEXTAUTH_SECRET="your-production-secret"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   \`\`\`

### Manual Deployment

1. **Build the Application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start Production Server**
   \`\`\`bash
   npm start
   \`\`\`

## 🧪 Testing

### Demo Accounts

The system includes pre-configured demo accounts:

- **Student**: john.student@example.com / password123
- **Admin**: admin@loanbank.com / password123
- **Employer**: admin@techcorp.com / password123
- **Institution**: admin@universityabc.edu / password123

### Running Tests

\`\`\`bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e
\`\`\`

## 📊 Monitoring & Analytics

### Built-in Analytics
- Loan approval rates
- Payment success rates
- User engagement metrics
- Financial performance tracking

### External Integrations
- Google Analytics support
- Custom event tracking
- Performance monitoring

## 🔒 Security

### Authentication
- Secure password hashing
- JWT token-based sessions
- Role-based access control
- Session management

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### Payment Security
- PCI DSS compliance considerations
- Secure payment processing
- Transaction encryption
- Audit logging

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit Changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
4. **Push to Branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed

## 📝 API Documentation

### Authentication Endpoints
- \`POST /api/auth/login\` - User login
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/logout\` - User logout

### Loan Management
- \`GET /api/loans\` - Get user loans
- \`POST /api/loans\` - Create new loan
- \`PUT /api/loans/:id\` - Update loan
- \`DELETE /api/loans/:id\` - Delete loan

### Payment Processing
- \`POST /api/payments\` - Process payment
- \`GET /api/payments/:id\` - Get payment details
- \`GET /api/payments/history\` - Payment history

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Check PostgreSQL service is running
   - Ensure database exists

2. **Authentication Issues**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Clear browser cookies and try again

3. **Payment Processing Errors**
   - Verify payment gateway credentials
   - Check network connectivity
   - Review payment gateway documentation

### Getting Help

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check the wiki for detailed guides
- **Community**: Join our Discord server for support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui**: For the beautiful UI components
- **Next.js**: For the amazing React framework
- **Vercel**: For hosting and deployment platform
- **PostgreSQL**: For the robust database system

## 📞 Support

For support and questions:
- **Email**: support@student-ltrs.com
- **GitHub**: [Create an issue](https://github.com/your-org/student-ltrs/issues)
- **Documentation**: [Wiki](https://github.com/your-org/student-ltrs/wiki)

---

**Built with ❤️ for students in Malawi and beyond.**
