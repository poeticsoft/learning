
// https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4

import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';

const app = express();

// INTERFACE

const publicRoot = path.join(__dirname, '../../', 'public');

console.log(publicRoot);

app.use(express.static(publicRoot)); //Serves resources from public folder

// SERVER

//initialize a simple http server
const server = app.listen(process.env.PORT || 8999, () => {

    const serverData: any = server.address();
    
    console.log(`Server started on port ${ serverData.port } :)`);
});

// WEBSOCKET

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    /* connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    */

    /* send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
    */

    setInterval(() => {

        ws.send('data ' + Math.random());
    }, 1000);
});

