import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { AppDataSource } from './config/database';
import { User } from './entity/User';
import * as dotenv from 'dotenv';
import { initializeWebSocketServer } from './websocket/websocketServer';

dotenv.config();

const app = express();

AppDataSource.initialize()
  .then(() => {
    const userRepository = AppDataSource.getRepository(User);

    app.use(express.json());

    app.get('/', async (req, res) => {
      res.send({ message: 'Hello World!' });
    });

    app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      const user = new User();
      user.username = username;
      user.password = password;

      await userRepository.save(user);
      res.send(user);
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
