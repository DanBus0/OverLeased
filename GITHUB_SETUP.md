
# GitHub Setup Guide for OverLeased

This guide will walk you through setting up your OverLeased project on GitHub and deploying it to Vercel.

## 🚀 Quick Setup Commands

### 1. Initialize Git Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "feat: Initial commit - OverLeased application"
```

### 2. Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository name: `overleased`
4. Description: "Comprehensive lease equity calculator and management platform"
5. Choose Public or Private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 3. Connect Local Repository to GitHub
```bash
# Add your GitHub repository as origin (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/overleased.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🔧 Environment Variables Setup

### For Local Development
1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your actual Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### For Vercel Deployment
You'll add these same variables in the Vercel dashboard during deployment.

## 🚀 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `overleased` repository
5. Configure environment variables
6. Deploy!

### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to configure your deployment
```

## 📋 Pre-Deployment Checklist

- ✅ All files committed to Git
- ✅ Repository pushed to GitHub
- ✅ Environment variables configured
- ✅ Supabase project set up (if using backend features)
- ✅ No sensitive data in repository
- ✅ Build runs successfully locally (`npm run build`)

## 🔍 Verify Everything Works

### Local Testing
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm run start
```

### Post-Deployment Testing
1. Visit your Vercel deployment URL
2. Test all pages and functionality
3. Verify forms submit correctly
4. Check responsive design on mobile
5. Test the lease calculator

## 🛠 Troubleshooting

### Common Issues

**Build Fails on Vercel:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

**Environment Variables Not Working:**
- Ensure they start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables

**Git Push Issues:**
```bash
# If you get authentication errors, use personal access token
# Go to GitHub Settings → Developer settings → Personal access tokens
# Generate new token and use it as password when prompted
```

**Repository Already Exists:**
```bash
# If you need to change remote URL
git remote set-url origin https://github.com/yourusername/overleased.git
```

## 🎯 Next Steps After Deployment

1. **Custom Domain**: Add your custom domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics for traffic insights
3. **Monitoring**: Set up error tracking and performance monitoring
4. **CI/CD**: Configure automated testing and deployment workflows
5. **Security**: Review and enhance security headers in vercel.json

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check GitHub repository settings
4. Verify Supabase configuration

---

🎉 **Congratulations!** Your OverLeased application should now be live and accessible worldwide!
