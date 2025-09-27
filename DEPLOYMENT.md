
# Deployment Guide for OverLeased

This guide will help you deploy your OverLeased application to Vercel via GitHub.

## 📋 Prerequisites

- GitHub account
- Vercel account
- Supabase project (if using backend features)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it "overleased" (or your preferred name)
   - Make it public or private
   - Don't initialize with README (we already have one)

### Step 2: Push Your Code to GitHub

1. **Initialize git in your project** (if not already done):
```bash
git init
```

2. **Add your GitHub repository as origin**:
```bash
git remote add origin https://github.com/yourusername/overleased.git
```

3. **Add all files and commit**:
```bash
git add .
git commit -m "Initial commit: OverLeased application"
```

4. **Push to GitHub**:
```bash
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import your project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your "overleased" repository
   - Click "Import"

3. **Configure your project**:
   - **Project Name**: overleased (or your preference)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: .next (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### Step 4: Verify Deployment

1. **Check your deployment**:
   - Vercel will provide a URL like `https://overleased.vercel.app`
   - Click the URL to view your live site

2. **Test functionality**:
   - Navigate through your pages
   - Test the lease calculator
   - Verify forms are working
   - Check responsive design on mobile

### Step 5: Custom Domain (Optional)

1. **Add custom domain**:
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy every push to the main branch
- Create preview deployments for pull requests
- Show deployment status in GitHub

## 🛠 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify environment variables are set

2. **Environment Variables Not Working**:
   - Ensure they start with `NEXT_PUBLIC_` for client-side access
   - Redeploy after adding new environment variables

3. **404 Errors**:
   - Check your page routing in the `pages` directory
   - Ensure file names match your routes

4. **Supabase Connection Issues**:
   - Verify your Supabase URL and keys
   - Check Supabase project settings
   - Ensure RLS policies are configured correctly

## 📊 Monitoring

- **Vercel Analytics**: Enable in project settings for traffic insights
- **Error Tracking**: Monitor deployment logs for issues
- **Performance**: Use Vercel's built-in performance monitoring

## 🔐 Security Checklist

- ✅ Environment variables are properly set
- ✅ No sensitive data in repository
- ✅ Supabase RLS policies are enabled
- ✅ HTTPS is enforced (automatic with Vercel)
- ✅ Security headers are configured (via vercel.json)

## 🎉 Success!

Your OverLeased application should now be live and accessible to users worldwide!

**Next Steps**:
- Set up monitoring and analytics
- Configure custom domain
- Set up staging environment
- Implement CI/CD workflows
