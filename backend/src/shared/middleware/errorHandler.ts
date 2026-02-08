import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ApiResponse } from '@food-ordering/shared';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      message: err.errors.map((e) => e.message).join(', '),
    });
  }

  console.error('Unexpected error:', err);

  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'An unexpected error occurred',
  });
};
