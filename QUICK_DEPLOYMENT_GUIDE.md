# Quick Deployment Guide - FlairAi

## 🚀 Immediate Deployment Options

### Option 1: Vercel (Free, 5 minutes)
```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready deployment"
git push origin main

# 2. Go to vercel.com and import the GitHub repository
# 3. Set environment variables in Vercel dashboard:
#    - SUPABASE_URL
#    - SUPABASE_ANON_KEY
#    - SUPABASE_SERVICE_ROLE_KEY
#    - JWT_SECRET
#    - GEMINI_API_KEY
# 4. Deploy automatically
```

### Option 2: Netlify (Free, 5 minutes)
```bash
# 1. Build the project
npm run build

# 2. Drag and drop the 'dist' folder to netlify.com/drop
# 3. Set environment variables in Netlify dashboard
# 4. Connect backend to Supabase Edge Functions
```

### Option 3: DigitalOcean App Platform ($5/month)
```bash
# 1. Create DigitalOcean account
# 2. Use App Platform with GitHub integration
# 3. Set environment variables
# 4. Deploy with auto-scaling
```

### Option 4: Google Cloud Run (Pay-per-use)
```bash
# Use existing cloudbuild.yaml configuration
gcloud builds submit --config=deployment/cloudbuild.yaml
```

## 🔧 Environment Variables Required

```env
NODE_ENV=production
SUPABASE_URL=https://wrdfqnydraeyvjnpbiri.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGZxbnlkcmFleXZqbnBiaXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NTI1NzksImV4cCI6MjA2OTQyODU3OX0.UvnpYctCdnyGJ4pEvEvUPGRMxDLPVUE8lwsP_jyGZF8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGZxbnlkcmFleXZqbnBiaXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg1MjU3OSwiZXhwIjoyMDY5NDI4NTc5fQ.mbzeitf6qQce4fklJ8wVofkMp28koD1164Fx18Mv8Ec
JWT_SECRET=igqVvi7yr6AxTmr+lOL78EGmJM20ATebFZj7UuxHgdkgkONBCTqUVnMVvXVsP648FvDWR6t7upXReNeroOcqPg==
GEMINI_API_KEY=AIzaSyAV771IZZXaPXQmq4cnSwe-Lxtw570ZARY
```

## ✅ Current Status
- ✅ Application running locally
- ✅ All APIs tested and functional  
- ✅ Database schema ready
- ✅ Production builds successful
- ✅ Security measures implemented
- ✅ Ready for immediate deployment
