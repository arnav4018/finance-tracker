# 💰 AI-Powered Personal Finance Tracker

A modern, full-stack personal finance management application built with Next.js, TypeScript, and TailwindCSS.

## ✨ Features

### 🔐 **Authentication & Security**
- Secure user registration and login
- Password hashing with bcrypt
- Session management with NextAuth.js
- Rate limiting and security headers

### 📊 **Financial Management**
- **Dashboard**: Real-time financial overview with editable income/expenses
- **Income Tracking**: Manage multiple income sources with recurring/one-time classification
- **Expense Management**: Categorized expense tracking with detailed records
- **Savings Goals**: Visual progress tracking with deadline management

### 🤖 **AI-Powered Insights**
- Intelligent financial analysis based on spending patterns
- Personalized recommendations and warnings
- Savings rate optimization suggestions
- Achievement recognition system

### 🗄️ **Hybrid Data Storage**
- **Development**: File-based storage for easy setup
- **Production**: PostgreSQL database with automatic fallback
- **Migration Tools**: Seamless transition from development to production

### 🎨 **Modern UI/UX**
- Responsive design that works on all devices
- Beautiful TailwindCSS styling
- Interactive components with real-time updates
- Accessibility-compliant interface

## 🚀 Quick Start

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd finance-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Visit the application:**
   - Main app: http://localhost:3000
   - System status: http://localhost:3000/status

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── expenses/          # Expense management
│   ├── income/            # Income tracking
│   ├── goals/             # Savings goals
│   └── status/            # System status
├── components/            # Reusable UI components
├── lib/                   # Utility libraries
│   ├── database.ts        # Database operations
│   ├── users.ts           # User management
│   ├── mock-insights.ts   # AI insights generation
│   ├── rate-limit.ts      # API rate limiting
│   └── logger.ts          # Production logging
└── generated/             # Prisma generated files
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **React Hooks** - Modern React patterns

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication framework
- **Prisma** - Database ORM
- **PostgreSQL** - Production database
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database management UI

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run type-check       # TypeScript type checking
npm run lint            # ESLint code linting

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio

# Production
npm run build:production # Build for production
npm run start           # Start production server
npm run migrate:production # Migrate development data

# Maintenance
npm run clean           # Clean build artifacts
```

## 📊 Key Features Walkthrough

### Dashboard
- **Interactive Financial Cards**: Click to edit income and expenses
- **Real-time Calculations**: Automatic savings rate and net savings updates
- **Smart Insights**: AI-powered financial recommendations
- **Quick Navigation**: Easy access to all sections

### Income Management
- **Multiple Sources**: Track salary, freelance, investments, etc.
- **Recurring vs One-time**: Classify income types
- **Visual Summaries**: Total and recurring income displays
- **Easy Management**: Add, edit, and delete income entries

### Expense Tracking
- **Category-based**: Organize expenses by type
- **Detailed Records**: Date, description, and amount tracking
- **Quick Actions**: Fast expense entry and management
- **Total Calculations**: Automatic expense summaries

### Savings Goals
- **Visual Progress**: Progress bars with percentage completion
- **Priority Management**: High, medium, low priority goals
- **Deadline Tracking**: Days remaining until goal deadline
- **Quick Updates**: +$100/-$100 progress buttons
- **Achievement Celebrations**: Goal completion recognition

## 🔒 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: XSS and clickjacking protection
- **Input Validation**: Comprehensive data validation
- **Session Security**: Secure session management
- **Error Handling**: Safe error messages without data leakage

## 🌐 Production Readiness

### Performance
- **Optimized Build**: Production-ready Next.js build
- **Image Optimization**: WebP and AVIF support
- **CSS Optimization**: Purged and minified styles
- **Code Splitting**: Automatic route-based splitting

### Monitoring
- **Health Checks**: `/status` endpoint for system monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Core Web Vitals tracking
- **Database Monitoring**: Connection and query monitoring

### Scalability
- **Hybrid Storage**: Graceful database fallback
- **Rate Limiting**: API protection and throttling
- **Caching Ready**: Prepared for Redis integration
- **Load Balancer Ready**: Stateless application design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **System Status**: Visit `/status` for real-time system health
- **Documentation**: Check `DEPLOYMENT.md` for deployment guides
- **Issues**: Report bugs and feature requests via GitHub issues

---

Built with ❤️ using modern web technologies for a secure, scalable, and user-friendly financial management experience.