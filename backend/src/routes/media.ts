/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

/**
 * POST /api/media/upload
 * Upload media files
 */
router.post('/upload', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json({ message: 'Media upload endpoint' });
}));

export default router;