// Test file to verify environment variables and Supabase connection
// This can be accessed at http://localhost:5173/test-env

console.log('Testing environment variables...');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Present' : '❌ Missing');
console.log('VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? '✅ Present' : '❌ Missing');

// Test Supabase connection
import { supabase } from './lib/supabaseClient';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error && error.code === 'PGRST116') {
      console.log('✅ Supabase connection successful (table doesn\'t exist yet, but connection works)');
      return true;
    } else if (error) {
      console.log('⚠️ Supabase connection issue:', error.message);
      return false;
    } else {
      console.log('✅ Supabase connection and query successful');
      return true;
    }
  } catch (err) {
    console.error('❌ Supabase connection failed:', err);
    return false;
  }
}

// Run the test immediately
testSupabaseConnection();
