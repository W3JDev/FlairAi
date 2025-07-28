/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { logger } from './logger.js';

/**
 * Required environment variables
 */
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'NODE_ENV'
] as const;

/**
 * Optional environment variables with defaults
 */
const optionalEnvVars = {
  PORT: '3000',
  FRONTEND_URL: 'http://localhost:5173',
  GEMINI_API_KEY: '',
  UPLOAD_MAX_SIZE: '10mb',
  RATE_LIMIT_WINDOW_MS: '900000', // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: '100',
  LOG_LEVEL: 'info'
} as const;

/**
 * Validates all required environment variables are present
 * @throws {Error} If any required environment variable is missing
 */
export const validateEnvironment = (): void => {
  const missingVars: string[] = [];

  // Check required variables
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Set defaults for optional variables
  for (const [varName, defaultValue] of Object.entries(optionalEnvVars)) {
    if (!process.env[varName]) {
      process.env[varName] = defaultValue;
      logger.info(`Set default value for ${varName}: ${defaultValue}`);
    }
  }

  // Validate specific variable formats
  validateSpecificEnvVars();

  logger.info('Environment validation completed successfully', {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    supabaseUrl: process.env.SUPABASE_URL?.substring(0, 20) + '...',
  });
};

/**
 * Validates specific environment variable formats
 */
const validateSpecificEnvVars = (): void => {
  // Validate Supabase URL format
  const supabaseUrl = process.env.SUPABASE_URL;
  if (supabaseUrl && !isValidUrl(supabaseUrl)) {
    throw new Error('SUPABASE_URL must be a valid URL');
  }

  // Validate JWT secret length
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret && jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long for security');
  }

  // Validate Node environment
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv && !['development', 'staging', 'production', 'test'].includes(nodeEnv)) {
    throw new Error('NODE_ENV must be one of: development, staging, production, test');
  }

  // Validate PORT is a number
  const port = process.env.PORT;
  if (port && (isNaN(Number(port)) || Number(port) < 1 || Number(port) > 65535)) {
    throw new Error('PORT must be a valid port number (1-65535)');
  }
};

/**
 * Checks if a string is a valid URL
 */
const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets environment-specific configuration
 */
export const getConfig = () => ({
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  jwtSecret: process.env.JWT_SECRET!,
  geminiApiKey: process.env.GEMINI_API_KEY,
  uploadMaxSize: process.env.UPLOAD_MAX_SIZE || '10mb',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  logLevel: process.env.LOG_LEVEL || 'info'
});