/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * POST /api/webhooks/supabase
 * Handle Supabase webhooks
 */
router.post('/supabase', asyncHandler(async (req, res) => {
  res.json({ message: 'Supabase webhook endpoint' });
}));

export default router;