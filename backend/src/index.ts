import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { AppDataSource } from './ormconfig';
import { User } from './entity/User';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

AppDataSource.initialize().then(() => {
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
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            console.log('received: %s', message);
        });
        
        ws.send('Welcome to the RPG game!');
    });

    const port = Number(process.env.APP_PORT || 3000);
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
    });
}).catch((error) => {
    console.error('[Database Error] %s', error);
});