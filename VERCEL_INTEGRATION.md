# Vercel + GitHub + Supabase Integration Guide
========================================

## 🎯 **Current Status**
✅ Database tables created successfully:
- `profiles` table with user metadata
- `flarebots` table with AI assistant configurations
- Foreign key relationship properly established

## 🔄 **Alternative Integration: GitHub → Vercel → Supabase**

Since direct GitHub integration requires Supabase Pro, we'll use Vercel as the bridge:

### **Integration Flow:**
```
GitHub Repository (W3JDev/FlairAi)
        ↓
Vercel Deployment Platform
        ↓
Supabase Database (PostgreSQL)
```

### **Setup Steps:**

#### 1. **Vercel Project Setup**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
npx vercel login

# Link current project to Vercel
npx vercel link
```

#### 2. **Environment Variables in Vercel**
Configure these in Vercel Dashboard → Settings → Environment Variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=https://wrdfqnydraeyvjnpbiri.supabase.co
VITE_SUPABASE_ANON_KEY=[your_anon_key]
SUPABASE_SERVICE_ROLE_KEY=[your_service_role_key]

# Google AI
VITE_GEMINI_API_KEY=[your_gemini_key]

# Build Configuration
NODE_VERSION=18
BUILD_COMMAND=npm run build
OUTPUT_DIRECTORY=dist
```

#### 3. **GitHub Actions for Database Migrations**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel with Database Updates

on:
  push:
    branches: [ Lets-Coin ]
  pull_request:
    branches: [ Lets-Coin ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
        scope: ${{ secrets.TEAM_ID }}
```

#### 4. **Database Migration Strategy**
Since we can't auto-migrate through Supabase, use this approach:

```bash
# Development workflow
1. Make schema changes locally
2. Test with local Supabase instance
3. Document changes in /database/migrations/
4. Apply manually to production Supabase
5. Deploy frontend via Vercel
```

## 📁 **Project Structure for Vercel Deployment**

```
FlairAi/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions for CI/CD
├── .vercel/                     # Vercel configuration
├── database/
│   ├── schema.sql              # Current schema
│   └── migrations/             # Manual migration scripts
├── public/                     # Static assets
├── src-business/               # Main application code
├── dist/                       # Build output (gitignored)
├── vercel.json                 # Vercel config
└── package.json               # Scripts and dependencies
```

## 🚀 **Deployment Commands**

```bash
# Development
npm run dev                     # Local development

# Testing
npm run test                    # Run tests
npm run lint                    # Code quality

# Deployment
npm run build                   # Build for production
npx vercel --prod              # Deploy to production
npx vercel --preview           # Deploy preview

# Database (manual)
# Apply schema changes in Supabase Dashboard
# Update environment variables in Vercel
```

## 🔧 **Required Files for Vercel**
