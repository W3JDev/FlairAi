
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase config:', { 
  url: supabaseUrl ? 'Configured' : 'Missing', 
  key: supabaseAnonKey ? 'Configured' : 'Missing' 
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key must be provided in environment variables. App will run in offline mode.');
}

// Create a single instance to avoid multiple GoTrueClient warnings
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const supabase = supabaseInstance || (supabaseInstance = createClient(supabaseUrl || 'https://demo.supabase.co', supabaseAnonKey || 'demo-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // Enable URL parsing for redirect
    flowType: 'pkce',
  }
}));
