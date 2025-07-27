/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Environment validation utility
 * 
 * This module validates all required environment variables at startup
 * and provides helpful error messages if any are missing or invalid.
 */

// Define the shape of our environment variables with TypeScript
interface EnvVariables {
  // Required variables
  VITE_GEMINI_API_KEY: string;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  
  // Optional variables with defaults
  VITE_APP_ENV?: 'development' | 'staging' | 'production';
  VITE_STRICT_MODE?: boolean;
  VITE_ENABLE_ERROR_REPORTING?: boolean;
}

// Extend ImportMeta interface to properly type import.meta.env
declare global {
  interface ImportMeta {
    env: EnvVariables & {
      [key: string]: string | boolean | undefined;
    };
  }
}

/**
 * Validates that a URL string is properly formatted
 * @param url The URL string to validate
 * @returns True if the URL is valid, false otherwise
 */
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates that an API key meets minimum requirements
 * @param key The API key to validate
 * @returns True if the key is valid, false otherwise
 */
const isValidApiKey = (key: string): boolean => {
  // Most API keys are at least 10 characters
  // This is a basic check - adjust based on specific API key formats
  return key.length >= 10 && key !== 'your_gemini_api_key_here' && key !== 'PLACEHOLDER_API_KEY';
};

/**
 * Error class for environment validation failures
 */
export class EnvironmentError extends Error {
  constructor(message: string) {
    super(`Environment Error: ${message}`);
    this.name = 'EnvironmentError';
  }
}

/**
 * Validates all required environment variables and their formats
 * @throws {EnvironmentError} If any required variables are missing or invalid
 */
export function validateEnvironment(): void {
  const errors: string[] = [];
  
  // Check required variables
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    errors.push('VITE_GEMINI_API_KEY is required but not set');
  } else if (!isValidApiKey(import.meta.env.VITE_GEMINI_API_KEY)) {
    errors.push('VITE_GEMINI_API_KEY appears to be invalid or a placeholder value');
  }
  
  if (!import.meta.env.VITE_SUPABASE_URL) {
    errors.push('VITE_SUPABASE_URL is required but not set');
  } else if (!isValidUrl(import.meta.env.VITE_SUPABASE_URL)) {
    errors.push('VITE_SUPABASE_URL must be a valid URL');
  }
  
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    errors.push('VITE_SUPABASE_ANON_KEY is required but not set');
  } else if (import.meta.env.VITE_SUPABASE_ANON_KEY.length < 10) {
    errors.push('VITE_SUPABASE_ANON_KEY appears to be invalid');
  }
  
  // Validate optional variables if they're set
  const appEnv = import.meta.env.VITE_APP_ENV;
  if (appEnv && !['development', 'staging', 'production'].includes(appEnv)) {
    errors.push('VITE_APP_ENV must be one of: development, staging, production');
  }
  
  // If we have any errors, throw with all error messages
  if (errors.length > 0) {
    throw new EnvironmentError(
      `Missing or invalid environment variables:\n- ${errors.join('\n- ')}\n\nPlease check your .env.local file and ensure all required variables are set correctly.`
    );
  }
}

/**
 * Gets the current environment with proper type checking
 * @returns The current environment or 'development' as default
 */
export function getEnvironment(): 'development' | 'staging' | 'production' {
  return import.meta.env.VITE_APP_ENV || 'development';
}

/**
 * Checks if strict mode is enabled
 * @returns True if strict mode is enabled, false otherwise
 */
export function isStrictMode(): boolean {
  return import.meta.env.VITE_STRICT_MODE === true;
}

/**
 * Checks if error reporting is enabled
 * @returns True if error reporting is enabled, false otherwise
 */
export function isErrorReportingEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_ERROR_REPORTING === true;
}

// Export a default function for easy importing and immediate validation
export default function checkEnvironment(): void {
  validateEnvironment();
  console.log(`Environment validated successfully. Running in ${getEnvironment()} mode.`);
}
