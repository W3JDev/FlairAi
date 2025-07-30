-- FlairAi Database Schema
-- Multi-tenant architecture with proper tenant isolation
-- PostgreSQL Schema for Supabase

-- ================================
-- Enable Required Extensions
-- ================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================
-- Core Tables
-- ================================

-- Tenants table for multi-tenant architecture
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan VARCHAR(50) DEFAULT 'starter' NOT NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    avatar_url TEXT,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'non-binary', 'prefer_not_to_say')),
    role VARCHAR(50) DEFAULT 'trainee' CHECK (role IN ('admin', 'manager', 'trainer', 'trainee', 'server', 'host_hostess', 'bartender', 'owner', 'other')),
    interests TEXT,
    language_preference VARCHAR(10) DEFAULT 'en',
    year_of_birth INTEGER,
    race_nationality VARCHAR(100),
    info TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Agents/Flarebots
CREATE TABLE IF NOT EXISTS flarebots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    flarebot_id UUID REFERENCES flarebots(id) ON DELETE SET NULL,
    session_name VARCHAR(255),
    scenario_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
    duration_seconds INTEGER DEFAULT 0,
    score INTEGER,
    feedback TEXT,
    transcript JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge Bases (shared resources)
CREATE TABLE IF NOT EXISTS knowledge_bases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media Files
CREATE TABLE IF NOT EXISTS media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    purpose VARCHAR(100), -- 'avatar', 'training_material', 'knowledge_base', etc.
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics and Usage Tracking
CREATE TABLE IF NOT EXISTS usage_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}',
    session_id UUID,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Metrics
CREATE TABLE IF NOT EXISTS performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    training_session_id UUID REFERENCES training_sessions(id) ON DELETE CASCADE,
    metric_type VARCHAR(100) NOT NULL, -- 'response_time', 'accuracy', 'engagement', etc.
    metric_value DECIMAL(10,2) NOT NULL,
    benchmark_value DECIMAL(10,2),
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates for common scenarios
CREATE TABLE IF NOT EXISTS scenario_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
    scenario_data JSONB NOT NULL,
    is_public BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- Indexes for Performance
-- ================================

-- Tenant isolation indexes
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_flarebots_tenant_id ON flarebots(tenant_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_tenant_id ON training_sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_bases_tenant_id ON knowledge_bases(tenant_id);
CREATE INDEX IF NOT EXISTS idx_media_files_tenant_id ON media_files(tenant_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_tenant_id ON usage_analytics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_tenant_id ON performance_metrics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_scenario_templates_tenant_id ON scenario_templates(tenant_id);

-- User-specific indexes
CREATE INDEX IF NOT EXISTS idx_flarebots_user_id ON flarebots(user_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_user_id ON training_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_media_files_user_id ON media_files(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_user_id ON usage_analytics(user_id);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_training_sessions_status ON training_sessions(status);
CREATE INDEX IF NOT EXISTS idx_training_sessions_created_at ON training_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_event_type ON usage_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_created_at ON usage_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_flarebots_is_active ON flarebots(is_active);

-- ================================
-- Row Level Security (RLS)
-- ================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE flarebots ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_templates ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

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

-- Media files policies
CREATE POLICY "Users can view own media files" ON media_files
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload media files" ON media_files
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media files" ON media_files
    FOR DELETE USING (auth.uid() = user_id);

-- Knowledge bases policies
CREATE POLICY "Users can view accessible knowledge bases" ON knowledge_bases
    FOR SELECT USING (
        is_public = true OR 
        created_by = auth.uid() OR
        tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Users can create knowledge bases" ON knowledge_bases
    FOR INSERT WITH CHECK (created_by = auth.uid());

-- ================================
-- Functions for Common Operations
-- ================================

-- Function to automatically set tenant_id and updated_at
CREATE OR REPLACE FUNCTION set_tenant_and_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    -- Set tenant_id from user's profile if not already set
    IF NEW.tenant_id IS NULL AND NEW.user_id IS NOT NULL THEN
        SELECT tenant_id INTO NEW.tenant_id 
        FROM profiles 
        WHERE id = NEW.user_id;
    END IF;
    
    -- Set updated_at timestamp
    NEW.updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION set_tenant_and_updated_at();

CREATE TRIGGER set_updated_at_flarebots
    BEFORE UPDATE ON flarebots
    FOR EACH ROW
    EXECUTE FUNCTION set_tenant_and_updated_at();

CREATE TRIGGER set_updated_at_knowledge_bases
    BEFORE UPDATE ON knowledge_bases
    FOR EACH ROW
    EXECUTE FUNCTION set_tenant_and_updated_at();

CREATE TRIGGER set_updated_at_scenario_templates
    BEFORE UPDATE ON scenario_templates
    FOR EACH ROW
    EXECUTE FUNCTION set_tenant_and_updated_at();

-- Function to create default tenant for new users
CREATE OR REPLACE FUNCTION create_user_tenant()
RETURNS TRIGGER AS $$
DECLARE
    new_tenant_id UUID;
BEGIN
    -- Create a personal tenant for the user
    INSERT INTO tenants (name, slug, plan)
    VALUES (
        COALESCE(NEW.name, NEW.email) || '''s Organization',
        'user-' || NEW.id,
        'starter'
    )
    RETURNING id INTO new_tenant_id;
    
    -- Update the user's profile with the tenant_id
    NEW.tenant_id = new_tenant_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create tenant for new profiles
CREATE TRIGGER create_tenant_for_user
    BEFORE INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_user_tenant();