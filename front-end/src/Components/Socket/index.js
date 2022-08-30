import { useRef, useEffect } from 'react';

const webSocket = useRef(null);

webSocket.current = new W3CWebSocket("https://the-wall-dan-blake.herokuapp.com".replace(/^http/, 'ws'), 'broadcast-protocol');

export default webSocket;