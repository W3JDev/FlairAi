#!/bin/bash

echo "🚀 FlairAi Database Setup Guide"
echo "================================"
echo ""
echo "❌ Issue: Read-only transaction error prevents programmatic table creation"
echo "✅ Solution: Use Supabase Dashboard SQL Editor"
echo ""
echo "📋 STEP 1: Open Supabase Dashboard"
echo "URL: https://wrdfqnydraeyvjnpbiri.supabase.co/project/default/sql/new"
echo ""
echo "📋 STEP 2: Copy & Paste Essential Schema"
echo "Copy the SQL below into the SQL Editor:"
echo ""
echo "-- ====================================="
echo "-- ESSENTIAL FLAIRAI TABLES"
echo "-- ====================================="
echo ""
cat << 'EOF'
-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    avatar_url TEXT,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'non-binary', 'prefer_not_to_say')),
    role VARCHAR(50) DEFAULT 'trainee',
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
    menu_description TEXT,
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training Sessions
CREATE TABLE IF NOT EXISTS training_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    flarebot_id UUID REFERENCES flarebots(id) ON DELETE SET NULL,
    session_name VARCHAR(255),
    scenario_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    duration_seconds INTEGER DEFAULT 0,
    score INTEGER,
    feedback TEXT,
    transcript JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE flarebots ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Flarebots policies
CREATE POLICY "Users can view own flarebots" ON flarebots
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create flarebots" ON flarebots
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flarebots" ON flarebots
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flarebots" ON flarebots
    FOR DELETE USING (auth.uid() = user_id);

-- Training sessions policies
CREATE POLICY "Users can view own training sessions" ON training_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create training sessions" ON training_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own training sessions" ON training_sessions
    FOR UPDATE USING (auth.uid() = user_id);
EOF

echo ""
echo "📋 STEP 3: Click 'RUN' in the SQL Editor"
echo ""
echo "📋 STEP 4: Verify Tables Created"
echo "Go to Table Editor and confirm these tables exist:"
echo "  ✅ profiles"
echo "  ✅ flarebots" 
echo "  ✅ training_sessions"
echo ""
echo "🎯 After setup, refresh your FlairAi app and the database errors will disappear!"
echo ""
echo "🔗 Quick Link: https://wrdfqnydraeyvjnpbiri.supabase.co/project/default/sql/new"
