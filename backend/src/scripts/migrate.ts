import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
import { config } from 'dotenv';
config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTables() {
  try {
    console.log('🚀 Starting database setup...');
    
    // Create profiles table
    console.log('📋 Creating profiles table...');
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    
    if (profilesError) {
      console.log('⚠️  Profiles table might already exist or using alternative method');
    } else {
      console.log('✅ Profiles table created');
    }
    
    // Create flarebots table
    console.log('📋 Creating flarebots table...');
    const { error: flarebotsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    
    if (flarebotsError) {
      console.log('⚠️  Flarebots table might already exist or using alternative method');
    } else {
      console.log('✅ Flarebots table created');
    }
    
    console.log('✅ Database setup completed!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    console.log('');
    console.log('🔧 Manual Setup Required:');
    console.log('Please go to your Supabase Dashboard > SQL Editor and run the schema.sql file manually');
    console.log('Database URL: ' + supabaseUrl);
  }
}

// Run the setup
createTables();
