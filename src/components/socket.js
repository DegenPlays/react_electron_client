import { io } from 'socket.io-client';
import config from '../config';
const serverAddress = config.REACT_APP_SERVER_ADDRESS;

console.log('serverAddress:',serverAddress)
// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5000';

// export const socket = io('http://degenplays.pythonanywhere.com/')
// export const socket = io('http://35.166.222.12:80')
export const socket = io.connect(serverAddress, { secure: true });