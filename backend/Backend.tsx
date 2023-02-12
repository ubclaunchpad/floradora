import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
const app: Express = express();
const port = 8080;

// define a route handler for the default home page
app.get('/isalive', (req: Request, res: Response) => {
    res.send("I'm alive!");
});

// start the Express server
const server: Server = app.listen(port);

export default server;
