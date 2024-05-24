import { createServer } from 'http';

import { AppDataSource } from './config/database';
import { initializeWebSocketServer } from './websocket/websocketServer';
import app from './app';

AppDataSource.initialize()
  .then(() => {
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
