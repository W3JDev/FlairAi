/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/analytics/dashboard
 * Get dashboard analytics
 */
router.get('/dashboard', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json({ message: 'Analytics dashboard endpoint' });
}));

export default router;