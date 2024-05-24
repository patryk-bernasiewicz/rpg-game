import { Router } from 'express';

import { User } from '../entity/User';
import { generateToken } from '../utils/jwt';
import { TOKEN_NAME } from '../const/auth';
import { authMiddleware } from '../middleware/auth.middleware';
import { AppDataSource } from '../config/database';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await userRepository.findOneBy({ username });
  if (existingUser) {
    return res.status(400).send({ success: false, message: 'User exists' });
  }

  const user = new User();
  user.username = username;
  user.password = password;

  const savedUser = await userRepository.save(user);

  const token = generateToken(savedUser.id);

  res.cookie(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).send({ success: true });
});

router.get('/protected', authMiddleware, async (req, res) => {
  const user = await userRepository.findOneBy({ id: req.userId });

  if (!user) {
    return res.status(401).send({ message: 'Invalid login' });
  }

  res.send({ message: `Hello user ${user.username}!` });
});

router.post('/login', async (req, res) => {
  const user = await userRepository.findOneBy({
    username: req.body.username,
  });

  if (!user) {
    return res.status(401).send({ success: false, message: 'Invalid login' });
  }

  const isPasswordValid = await user.comparePassword(req.body.password);
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

export default router;
