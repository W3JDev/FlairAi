/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/agents
 * Get user's agents
 */
router.get('/', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json({ message: 'Get agents endpoint' });
}));

/**
 * POST /api/agents
 * Create new agent
 */
router.post('/', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json({ message: 'Create agent endpoint' });
}));

export default router;