import { createServer } from 'http';

import app from './app';
import prisma from './config/database';
import { initializeWebSocketServer } from './websocket/websocketServer';

async function startServer() {
  try {
    await prisma.$connect();

    const server = createServer(app);

    initializeWebSocketServer(server);

    const port = Number(process.env.APP_PORT || 3000);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Zakończ aplikację w przypadku problemów z połączeniem
  }
}

startServer();
