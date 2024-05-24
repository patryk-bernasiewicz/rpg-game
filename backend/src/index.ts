import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { AppDataSource } from './config/database';
import { initializeWebSocketServer } from './websocket/websocketServer';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (process.env.APP_ORIGINS as string).split(','),
    credentials: true,
  }),
);

AppDataSource.initialize()
  .then(() => {
    app.use(routes);

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
