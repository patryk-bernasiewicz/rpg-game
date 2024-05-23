import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { TOKEN_NAME } from '../const/auth';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies[TOKEN_NAME];

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
