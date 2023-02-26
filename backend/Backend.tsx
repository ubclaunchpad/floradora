import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import pgPromise from 'pg-promise';
const pgp = pgPromise();
            // 'postgres://username:password@hostName:port/databaseName'
const db = pgp('postgres://postgres:admin@localhost:5432/testdb');
const app: Express = express();
const port = 8080;

// define a route handler for the default home page
app.get('/isalive', (req: Request, res: Response) => {
    res.send("I'm alive!");
});

db.one('SELECT EMAIL FROM USERS WHERE ID = 1', String)
    .then((data) => {
        if(data) {
            console.log('DATA:', data);
        }
      })
      .catch((error) => {
        console.log('ERROR:', error)
});


// start the Express server
const server: Server = app.listen(port);

export default server;

export class reqBody {
    // here for test, let input string length == 15
    user : string;
    opCode : string;
    data : Int16Array;

    constructor(inStr : string){
        // object layout: opcode-user-data
        //  field sizes:   10     5     5
        this.opCode = inStr.slice(0, 10);
        this.user = inStr.slice(10, 15);
        this.data = new Int16Array(inStr.slice(15, 20).split('').map(c => c.charCodeAt(0)));
    }
}