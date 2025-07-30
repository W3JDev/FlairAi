# Database Setup Instructions

The FlairAi application requires database tables to be set up in Supabase. Follow these steps:

## Method 1: Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://wrdfqnydraeyvjnpbiri.supabase.co
   - Navigate to: **SQL Editor**

2. **Run the Schema**
   - Copy the contents of `/database/schema.sql`
   - Paste into the SQL Editor
   - Click **Run** to execute all statements

3. **Verify Tables Created**
   - Go to **Table Editor**
   - Confirm these tables exist:
     - `profiles`
     - `flarebots` 
     - `training_sessions`
     - `knowledge_bases`
     - etc.

## Method 2: Quick Essential Tables

If you want to quickly get the app working, run just these essential tables:

```sql
-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    avatar_url TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Agents/Flarebots
CREATE TABLE IF NOT EXISTS flarebots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    personality TEXT,
    body_color VARCHAR(7) DEFAULT '#58A6FF',
    voice VARCHAR(50) DEFAULT 'Charon',
    knowledge_base TEXT,
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE flarebots ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own flarebots" ON flarebots
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create flarebots" ON flarebots
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flarebots" ON flarebots
    FOR UPDATE USING (auth.uid() = user_id);
```

## Current Status

- ✅ Frontend LiveAPIContext errors fixed
- ⚠️  Database tables need manual setup
- 🚀 App will work once tables are created

## After Setup

1. Refresh the application
2. The database errors should disappear
3. User profiles and FlareBot creation will work properly

---

**Quick Setup URL**: https://wrdfqnydraeyvjnpbiri.supabase.co/project/default/sql/new
