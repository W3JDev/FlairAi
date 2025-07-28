/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/training/sessions
 * Get training sessions
 */
router.get('/sessions', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json({ message: 'Get training sessions endpoint' });
}));

export default router;