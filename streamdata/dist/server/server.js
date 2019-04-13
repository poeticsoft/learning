"use strict";
// https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
exports.__esModule = true;
var express = require("express");
var WebSocket = require("ws");
var path = require("path");
var app = express();
// INTERFACE
var publicRoot = path.join(__dirname, '../../', 'public');
console.log(publicRoot);
app.use(express.static(publicRoot)); //Serves resources from public folder
// SERVER
//initialize a simple http server
var server = app.listen(process.env.PORT || 8999, function () {
    var serverData = server.address();
    console.log("Server started on port " + serverData.port + " :)");
});
// WEBSOCKET
//initialize the WebSocket server instance
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    //connection is up, let's add a simple simple event
    ws.on('message', function (message) {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send("Hello, you sent -> " + message);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
    setInterval(function () {
        ws.send('data ' + Math.random());
    }, 1000);
});
