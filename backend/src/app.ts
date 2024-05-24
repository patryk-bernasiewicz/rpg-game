import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppDataSource } from './config/database';
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
app.use(routes);

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { mockUserRepository } = require('./__tests__/auth.test');
  AppDataSource.getRepository = jest.fn().mockReturnValue(mockUserRepository);
}

export default app;
