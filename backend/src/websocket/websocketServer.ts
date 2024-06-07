import { Server } from 'http';
import { WebSocketServer } from 'ws';

export const initializeWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message.toString());

      switch (parsedMessage.type) {
        default:
          ws.send('Unknown message type');
      }
    });
  });

  return wss;
};
