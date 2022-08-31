import { w3cwebsocket as W3CWebSocket } from "websocket";

const webSocket = new W3CWebSocket("https://the-wall-app1.herokuapp.com".replace(/^http/, 'ws'), 'broadcast-protocol');

export default webSocket;
