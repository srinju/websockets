'use strict';

const WebSocket = require('ws/lib/websocket');

WebSocket.createWebSocketStream = require('ws/lib/stream');
WebSocket.Server = require('ws/lib/websocket-server');
WebSocket.Receiver = require('ws/lib/receiver');
WebSocket.Sender = require('ws/lib/sender');

WebSocket.WebSocket = WebSocket;
WebSocket.WebSocketServer = WebSocket.Server;

module.exports = WebSocket;
