/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';
import { logger } from './logger.js';

// Use demo values for development if environment variables are not set
const supabaseUrl = process.env.SUPABASE_URL || 'https://demo.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-role-key';

// Log warning in development if using demo values
if (process.env.NODE_ENV === 'development' && (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)) {
  logger.warn('Using demo Supabase configuration for development. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for production.');
}

// Create Supabase client with service role key for backend operations
export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Test connection on startup
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      logger.error('Supabase connection test failed:', error);
      return false;
    }
    
    logger.info('Supabase connection successful');
    return true;
  } catch (error) {
    logger.error('Supabase connection error:', error);
    return false;
  }
};