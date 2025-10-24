import express from 'express';
import { envVar } from '../environment';
import cors from 'cors';
import { registerRoutes } from './controllers/register-routes';

const app = express();

app.use(cors())
app.use(express.json());

const port = envVar.app.port;

registerRoutes(app);

export function startServer() {
    app.listen(port, () => {
        console.log("Server is running on port", port);
    });
}