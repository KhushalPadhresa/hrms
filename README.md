# Employee Management System

A comprehensive, modern Employee Management System built with Next.js 14, featuring a clean admin interface for managing employees, leave applications, and payroll operations.

## ✨ Features

### 🔐 Authentication

- **User Registration & Login** - Secure authentication system
- **Protected Routes** - Role-based access control
- **Session Management** - Persistent login sessions

### 📊 Dashboard

- **Overview Statistics** - Employee count, department distribution, recent activities
- **Quick Actions** - Fast access to common operations
- **Recent Activities** - Real-time updates on system activities
- **Performance Metrics** - Visual charts and analytics

### 👥 Employee Management

- **Employee Directory** - Comprehensive employee listing with search and filters
- **CRUD Operations** - Add, edit, view, and manage employee records
- **Advanced Search** - Filter by department, position, status
- **Employee Profiles** - Detailed individual employee pages
- **Bulk Operations** - Mass updates and exports

### 📝 Leave Management

- **Leave Applications** - Submit and track leave requests
- **Approval Workflow** - Manager approval system
- **Leave History** - Complete leave records
- **Leave Balance** - Track available leave days
- **Calendar Integration** - Visual leave calendar

### 💰 Payroll Management

- **Salary Processing** - Monthly payroll generation
- **Salary Slips** - Digital pay slip generation and download
- **Salary History** - Complete payment records
- **Tax Calculations** - Automated tax deductions
- **Payroll Reports** - Comprehensive payroll analytics

### 🎨 Modern UI/UX

- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Theme switching support
- **Professional Interface** - Clean, modern design
- **Accessibility** - WCAG compliant interface
- **Toast Notifications** - Real-time feedback

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono, Inter
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Animations**: Tailwind CSS animations
- **Theme**: next-themes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd employee-management-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
├── app/ # Next.js App Router
│ ├── dashboard/ # Dashboard page
│ ├── employees/ # Employee management pages
│ │ ├── add/ # Add employee form
│ │ ├── edit/[id]/ # Edit employee form
│ │ └── [id]/ # Employee profile
│ ├── leave-management/ # Leave management page
│ ├── payroll/ # Payroll management page
│ ├── profile/ # User profile page
│ ├── login/ # Login page
│ ├── signup/ # Registration page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page (redirects)
│ └── globals.css # Global styles
├── components/ # Reusable components
│ ├── ui/ # shadcn/ui components
│ ├── auth-guard.tsx # Authentication wrapper
│ ├── dashboard-layout.tsx # Main layout with sidebar
│ ├── app-sidebar.tsx # Navigation sidebar
│ └── theme-provider.tsx # Theme context
├── contexts/ # React contexts
│ └── employee-context.tsx # Employee state management
├── hooks/ # Custom hooks
│ ├── use-mobile.tsx # Mobile detection
│ └── use-toast.ts # Toast notifications
├── lib/ # Utilities
│ └── utils.ts # Helper functions
└── types/ # TypeScript definitions
\`\`\`

## 🎯 Usage

### Default Login

The system includes demo authentication. You can create new accounts or use the existing demo data.

### Navigation

- **Dashboard**: Overview and quick stats
- **Employees**: Manage employee records
- **Leave Management**: Handle leave applications
- **Payroll**: Process salaries and generate slips
- **Profile**: Manage your account

### Key Features Usage

#### Adding Employees

1. Navigate to Employees → Add Employee
2. Fill in the comprehensive form with personal, employment, and emergency contact details
3. Submit to create the employee record

#### Processing Leave

1. Go to Leave Management
2. Review pending applications
3. Approve or reject with comments
4. Track leave balances and history

#### Payroll Operations

1. Access Payroll section
2. Process monthly payroll
3. Generate and download salary slips
4. View salary history and reports

## 🎨 Customization

### Themes

The system supports both light and dark themes. Users can toggle between themes using the theme switcher in the sidebar.

### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind configuration for design system changes
- Customize shadcn/ui components in `components/ui/`

### Adding Features

1. Create new pages in the `app/` directory
2. Add navigation items in `components/app-sidebar.tsx`
3. Update routing in the main layout

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configurations:

\`\`\`env

# Add your environment variables here

NEXT_PUBLIC_APP_NAME="Employee Management System"
\`\`\`

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons

## 📞 Support

For support, email support@yourcompany.com or create an issue in the repository.

---

**Built with ❤️ using Next.js and shadcn/ui**
