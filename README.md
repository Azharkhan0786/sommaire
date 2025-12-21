# 📄 Sommaire - AI-Powered PDF Summarizer

## 🌟 Overview

**Sommaire** is a modern, AI-powered PDF summarization platform that transforms lengthy documents into concise, well-structured summaries. Built with cutting-edge AI models (Google Gemini & OpenAI), it provides intelligent document analysis with beautiful, responsive UI.

### ✨ Key Features

- **🤖 Dual AI Engine**: Choose between Google Gemini 2.5 Flash and OpenAI GPT models
- **📱 Responsive Design**: Modern UI built with Next.js 16, Tailwind CSS, and Radix UI
- **🔐 Secure Authentication**: Clerk-based user management with role-based access
- **💳 Subscription Model**: Razorpay integration for premium features
- **📤 File Upload**: Seamless PDF uploads with UploadThing
- **🗄️ Database**: PostgreSQL with Neon for reliable data storage
- **🎨 Beautiful UI**: Gradient backgrounds, smooth animations, and professional design
- **📊 Dashboard**: User-friendly interface to manage summaries and uploads

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide Icons
- **Theme**: Next Themes (Dark/Light mode support)

### Backend & AI

- **AI Models**: Google Gemini 2.5 Flash, OpenAI GPT
- **Authentication**: Clerk
- **Database**: PostgreSQL (Neon)
- **File Storage**: UploadThing
- **PDF Processing**: LangChain PDF Loader
- **Payments**: Razorpay

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm package manager
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sommaire.git
   cd sommaire
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=your_neon_database_url

   # AI APIs
   GEMINI_API_KEY=your_gemini_api_key
   OPENAI_API_KEY=your_openai_api_key

   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # File Upload (UploadThing)
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id

   # Payments (Razorpay)
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Database Setup**

   Run the schema file to set up your database:

   ```bash
   psql $DATABASE_URL -f schema.sql
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
sommaire/
├── app/                          # Next.js App Router
│   ├── (logged-in)/             # Protected routes
│   │   ├── dashboard/           # User dashboard
│   │   ├── summaries/           # Summary management
│   │   └── upload/              # File upload
│   ├── api/                     # API routes
│   │   ├── razorpay/            # Payment endpoints
│   │   ├── uploadthing/         # File upload API
│   │   └── user/                # User management
│   └── globals.css              # Global styles
├── components/                  # Reusable UI components
│   ├── common/                  # Shared components
│   ├── home/                    # Landing page components
│   ├── summaries/               # Summary-related components
│   ├── ui/                      # Base UI components
│   └── upload/                  # Upload components
├── lib/                         # Utility libraries
│   ├── db.ts                    # Database connection
│   ├── geminiai.ts              # Gemini AI integration
│   ├── langchain.ts             # PDF processing
│   ├── openai.ts                # OpenAI integration
│   └── summaries.ts             # Summary utilities
├── actions/                     # Server actions
├── utils/                       # Helper functions
│   ├── prompts.ts               # AI prompts
│   └── uploadthing.ts           # Upload configuration
└── schema.sql                   # Database schema
```

## 🎯 Usage

### For Users

1. **Sign Up/Login**: Create an account using Clerk authentication
2. **Upload PDF**: Navigate to the upload page and select a PDF file (max 32MB)
3. **AI Summarization**: Choose between Gemini or OpenAI models
4. **View Results**: Access summarized content in your dashboard
5. **Manage Summaries**: Edit, delete, or download your summaries

### For Developers

#### API Endpoints

- `POST /api/uploadthing` - File upload handling
- `POST /api/razorpay/order` - Create payment order
- `POST /api/razorpay/verify` - Verify payment
- `GET /api/user/can-upload` - Check upload permissions
- `GET /api/user/price-id` - Get user subscription status

## 🤖 AI Configuration

The application uses a sophisticated prompt system that ensures summaries are:

- **50% of original document length** (configurable)
- **Markdown formatted** with contextual emojis
- **Structurally consistent** with predefined sections
- **Technically accurate** while removing redundancy

### Supported Models

- **Google Gemini 2.5 Flash**: Fast, cost-effective summarization
- **OpenAI GPT**: High-quality, detailed summaries

## 💳 Subscription Plans

- **Free Tier**: Limited uploads and basic features
- **Premium Tier**: Unlimited uploads, priority processing, advanced features

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
# Run schema.sql in your PostgreSQL client
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **OpenAI** for advanced language models
- **Clerk** for seamless authentication
- **UploadThing** for reliable file uploads
- **Neon** for managed PostgreSQL
- **Razorpay** for payment processing
