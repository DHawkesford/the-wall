import { w3cwebsocket as W3CWebSocket } from "websocket";

const webSocket = new W3CWebSocket("https://the-wall-dan-blake.herokuapp.com".replace(/^http/, 'ws'), 'broadcast-protocol');

export default webSocket;
