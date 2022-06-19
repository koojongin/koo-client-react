import { Socket } from 'socket.io-client';
import { createContext } from 'react';
import { SOCKET_EVENT } from '../constants';

export const SocketContext = createContext<Array<Socket | undefined>>([]);
export const test = 1;
export function initSocketEvents(socket: Socket) {
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit(SOCKET_EVENT.CLIENT_LOGIN);
      resolve(socket);
    });
  });
}
