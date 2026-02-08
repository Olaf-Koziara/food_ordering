import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/utils/AppError';
import { env } from '../../shared/config/env';

export const adminAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-admin-token'];

  if (!token || token !== env.ADMIN_TOKEN) {
    return next(new AppError(401, 'Unauthorized: Invalid admin token'));
  }

  next();
};
