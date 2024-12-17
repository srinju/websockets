"use strict";
//websockets is a persistent conncection where you dont have to refresh to talk to the server
//well websocket connection can exist between a server to server too .
//the first reqeust that the browser gives is a http request only
//what usually happens in http conn is when there is a http request that goes out afte a handshake then the conn is closed
//in websockets there is no conn closing there is a persistent conncetion between the devices .
//thru websockets also there is a http server that is running under the hood only .
//when the server gets the request of http then it upgrades to a full duplex connection that is websockets
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
//creating a http server
const server = http_1.default.createServer(function (reqeust, response) {
    console.log((new Date()) + 'Received request for ' + reqeust.url);
    response.end('hi there!!');
});
//creating a websocket server instance
const wss = new ws_1.WebSocketServer({ server });
let usercount = 0;
wss.on('connection', function connection(socket) {
    socket.on('error', console.error); //after conn we in the function and get a socket instance and whenever there is any errro show the error
    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) { //a lot of times it takes the socket conn to open so  :- if the socket conn is open then
                client.send(data, { binary: isBinary }); //send the data --> note the data is the send data that was send by the end user 
            }
        });
    });
    console.log("user count is : ", ++usercount);
    socket.send('Hello! you have connected to the websocket server'); //whenever the user connects to the websocket server send them a hello message 
});
server.listen(8081, function () {
    console.log((new Date()) + 'Server is listening on port 8081');
});
