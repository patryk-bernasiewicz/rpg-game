import { NextFunction, Request, Response } from 'express';

import { TOKEN_NAME } from '../const/auth';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies[TOKEN_NAME];
  req.userId = null;

  if (!token) {
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  }

  req.userId = decoded.userId;
  next();
};
