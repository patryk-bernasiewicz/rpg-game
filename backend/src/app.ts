import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';

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
}

export default app;
