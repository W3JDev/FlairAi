/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

/**
 * Request logging middleware
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  
  // Store original res.end function
  const originalEnd = res.end;
  
  // Override res.end to log when response is sent
  res.end = function(chunk?: any, encoding?: any, cb?: any): any {
    const duration = Date.now() - startTime;
    
    // Log request details
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      contentLength: res.get('Content-Length') || '0'
    });
    
    // Call original res.end
    return originalEnd.call(this, chunk, encoding, cb);
  };
  
  next();
};