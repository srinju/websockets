//websockets is a persistent conncection where you dont have to refresh to talk to the server
//well websocket connection can exist between a server to server too .
//the first reqeust that the browser gives is a http request only
//what usually happens in http conn is when there is a http request that goes out afte a handshake then the conn is closed
//in websockets there is no conn closing there is a persistent conncetion between the devices .
//thru websockets also there is a http server that is running under the hood only .
//when the server gets the request of http then it upgrades to a full duplex connection that is websockets

import http from 'http';
import { WebSocketServer } from 'ws';

const server = http.createServer(function(reqeust : any , response : any){
    console.log((new Date()) + 'Received request for ' + reqeust.url);
    response.end('hi there!!');
});

const wss = new WebSocketServer({server});

wss.on('connection' , function connection(ws) {
    ws.on('error' , console.error);

    ws.on('message' , function message(data , isBinarty) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data , { binary : isBinarty })
            }
        });
    });
    ws.send('Hello! Message from Server!!');
});

server.listen(8080 , function() {
    console.log((new Date()) + 'Server is listening on port 8080');
});
