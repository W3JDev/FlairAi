/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { supabase } from '../utils/supabase.js';
import { logger } from '../utils/logger.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Validation schemas
const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

const signInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post('/signup', asyncHandler(async (req, res) => {
  const { email, password, username, name } = signUpSchema.parse(req.body);

  // Create user in Supabase Auth (Supabase will handle duplicate email check)
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm for development
  });

  if (authError || !authData.user) {
    logger.error('Auth signup error:', authError);
    return res.status(400).json({ error: authError?.message || 'Failed to create user' });
  }

  try {
    // Create user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        username,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      logger.error('Profile creation error:', profileError);
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ error: 'Failed to create user profile' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: authData.user.id,
        email: authData.user.email 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    logger.info('User signed up successfully', { 
      userId: authData.user.id, 
      email: authData.user.email 
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username,
        name
      },
      token
    });
  } catch (error) {
    logger.error('Signup error:', error);
    // Clean up auth user if anything fails
    await supabase.auth.admin.deleteUser(authData.user.id);
    res.status(500).json({ error: 'Failed to complete user registration' });
  }
}));

/**
 * POST /api/auth/signin
 * Sign in an existing user
 */
router.post('/signin', asyncHandler(async (req, res) => {
  const { email, password } = signInSchema.parse(req.body);

  // Sign in with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    logger.warn('Failed signin attempt', { email });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profileError || !profile) {
    logger.error('Profile fetch error during signin:', profileError);
    return res.status(500).json({ error: 'Failed to load user profile' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: authData.user.id,
      email: authData.user.email,
      tenantId: profile.tenant_id 
    },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  logger.info('User signed in successfully', { 
    userId: authData.user.id, 
    email: authData.user.email 
  });

  res.json({
    message: 'Signed in successfully',
    user: {
      id: authData.user.id,
      email: authData.user.email,
      username: profile.username,
      name: profile.name,
      role: profile.role,
      tenantId: profile.tenant_id
    },
    token,
    refreshToken: authData.session?.refresh_token
  });
}));

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = refreshTokenSchema.parse(req.body);

  const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession({
    refresh_token: refreshToken
  });

  if (refreshError || !sessionData.session) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  // Generate new JWT token
  const token = jwt.sign(
    { 
      userId: sessionData.session.user.id,
      email: sessionData.session.user.email 
    },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    refreshToken: sessionData.session.refresh_token
  });
}));

/**
 * POST /api/auth/signout
 * Sign out user (invalidate refresh token)
 */
router.post('/signout', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await supabase.auth.admin.signOut(refreshToken);
  }

  res.json({ message: 'Signed out successfully' });
}));

/**
 * POST /api/auth/forgot-password
 * Send password reset email
 */
router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = z.object({ email: z.string().email() }).parse(req.body);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`
  });

  if (error) {
    logger.error('Password reset error:', error);
    return res.status(500).json({ error: 'Failed to send reset email' });
  }

  res.json({ message: 'Password reset email sent' });
}));

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', asyncHandler(async (req, res) => {
  const { token, password } = z.object({
    token: z.string(),
    password: z.string().min(8)
  }).parse(req.body);

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    logger.error('Password update error:', error);
    return res.status(400).json({ error: 'Failed to reset password' });
  }

  res.json({ message: 'Password reset successfully' });
}));

export default router;