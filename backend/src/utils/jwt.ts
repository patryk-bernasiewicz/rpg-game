import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const generateConfirmationToken = (userId: number) => {
  return jwt.sign({ userId, timestamp: Date.now() }, SECRET_KEY, {
    expiresIn: '3d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: number };
  } catch (error) {
    return null;
  }
};
