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


// start the Express server
const server: Server = app.listen(port);

export default server;

db.multi(`
  DROP TABLE IF EXISTS USERS;
  CREATE TABLE USERS(ID INT PRIMARY KEY NOT NULL, FIRST_NAME TEXT NOT NULL, LAST_NAME TEXT NOT NULL, EMAIL TEXT);
  INSERT INTO USERS (ID, FIRST_NAME, LAST_NAME, EMAIL) VALUES (1, 'john', 'smith', 'jsmith@otlk.com');
  INSERT INTO USERS (ID, FIRST_NAME, LAST_NAME) VALUES (2, 'mike', 'smith');
  SELECT EMAIL FROM USERS WHERE ID = 1;
`).then((data) => {
  console.log('DATA:', data[data.length - 1][0].email);
}).catch((error) => {
  console.log('ERROR:', error);
});

/*export class reqBody {
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
}*/