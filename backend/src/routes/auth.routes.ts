import bcrypt from 'bcrypt';
import { Router } from 'express';

import prisma from '../config/database';
import { TOKEN_NAME } from '../const/auth';
import { authMiddleware } from '../middleware/auth.middleware';
import { generateConfirmationToken, generateToken } from '../utils/jwt';

const router = Router();

const sendConfirmationEmail = (email: string, confirmationToken: string) => {};

router.post('/register', async (req, res) => {
  const requiredFields = ['username', 'email', 'password'];
  const { username, email, password } = req.body;

  try {
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        throw new Error(`Missing field: ${field}`);
      }
    });
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown error type');
    }
    return res.status(400).send({ success: false, message: error.message });
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return res.status(400).send({ success: false, message: 'User exists' });
  }

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return res.status(400).send({ success: false, message: 'User exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });

  const token = generateToken(user.id);
  const confirmationToken = generateConfirmationToken(user.id);
  sendConfirmationEmail(email, confirmationToken);

  res.cookie(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).send({ success: true });
});

router.get('/protected', authMiddleware, async (req, res) => {
  if (!req.userId) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  res.send({ message: `Hello user ${user.username}!` });
});

router.post('/login', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    return res.status(401).send({ success: false, message: 'Invalid login' });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isPasswordValid) {
    return res.status(401).send({ success: false, message: 'Invalid login' });
  }

  const token = generateToken(user.id);
  res.cookie(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).send({ success: true });
});

router.post('/logout', (req, res) => {
  res.clearCookie(TOKEN_NAME);
  res.send({ success: true });
});

export default router;
