
# OverLeased

A comprehensive lease equity calculator and management platform that helps users understand and optimize their vehicle lease agreements.

## 🚀 Features

- **Lease Equity Calculator**: Calculate potential equity in your lease with advanced algorithms
- **User Registration**: Secure user account management with Supabase
- **Contact Forms**: Easy communication with the OverLeased team
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Real-time Data**: Powered by Supabase for instant updates

## 🛠 Tech Stack

- **Framework**: Next.js 15.2.3 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Vercel
- **Forms**: React Hook Form + Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend features)

### Local Development

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/overleased.git
cd overleased
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🚀 Deployment to Vercel

### Method 1: Direct GitHub Integration (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy!

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

## 🔧 Environment Variables

Set these in your Vercel dashboard under Project Settings > Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `CUSTOM_KEY` | Custom environment variable | No |

## 📁 Project Structure

```
overleased/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── forms/          # Form components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page sections
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Third-party integrations
│   │   └── supabase/       # Supabase configuration
│   ├── lib/                # Utility functions
│   ├── pages/              # Next.js pages
│   │   └── api/            # API routes
│   ├── services/           # Business logic services
│   └── styles/             # Global styles
├── public/                 # Static assets
└── ...config files
```

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- CSRF protection via Supabase
- Row Level Security (RLS) in database
- Secure environment variable handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🆘 Support

For support, email support@overleased.com or create an issue in this repository.

---

Built with ❤️ by the OverLeased team
