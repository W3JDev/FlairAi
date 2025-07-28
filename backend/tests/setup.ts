/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { beforeAll, afterAll, beforeEach } from '@jest/globals';
import { supabase } from '../src/utils/supabase.js';

// Setup test environment
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret-for-testing-purposes-only';
  
  // Clean up test database
  await cleanupTestDatabase();
});

afterAll(async () => {
  // Clean up after all tests
  await cleanupTestDatabase();
});

beforeEach(async () => {
  // Reset database state before each test
  await resetTestDatabase();
});

async function cleanupTestDatabase() {
  try {
    // Delete test data in reverse order of dependencies
    await supabase.from('training_sessions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('flarebots').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('tenants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  } catch (error) {
    console.warn('Cleanup error (may be expected):', error);
  }
}

async function resetTestDatabase() {
  // Additional per-test cleanup if needed
}