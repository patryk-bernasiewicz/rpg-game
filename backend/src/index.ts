import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { User } from './entity/User';
import { AppDataSource } from './config/database';
import { initializeWebSocketServer } from './websocket/websocketServer';
import { generateToken } from './utils/jwt';
import { TOKEN_NAME } from './const/auth';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

AppDataSource.initialize()
  .then(() => {
    const userRepository = AppDataSource.getRepository(User);

    app.use(express.json());

    app.get('/', async (req, res) => {
      res.send({ message: 'Hello World!' });
    });

    app.post('/register', async (req, res) => {
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

    app.get('/protected', authMiddleware, async (req, res) => {
      const user = await userRepository.findOneBy({ id: req.userId });

      if (!user) {
        return res.send({ message: 'Invalid login' });
      }

      res.send({ message: `Hello user ${user.username}!` });
    });

    const server = createServer(app);

    initializeWebSocketServer(server);

    const port = Number(process.env.APP_PORT || 3000);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error('[Database Error] %s', error);
  });
