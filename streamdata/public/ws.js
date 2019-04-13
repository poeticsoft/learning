// WEBSOCKET
var conn = new WebSocket('ws://localhost:8999');
// When the connection is open, send some data to the server
conn.onopen = function (E) {
    console.log('WebSocket Opened');
};
// Log errors
conn.onerror = function (error) {
    console.log('WebSocket Error ' + error);
};
// Log messages from the server
conn.onmessage = function (e) {
    console.log('Server: ' + e.data);
};
