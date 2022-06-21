import { Socket } from 'socket.io-client';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { CLIENT_LOGIN } from '../constants/socket.event';

interface ISocketProvider {
  socket?: Socket;
  connected: boolean;
}

const defaultSocketContext = {
  connected: false,
};
export const SocketContext =
  createContext<ISocketProvider>(defaultSocketContext);
export const test = 1;
export function initSocketEvents(socket: Socket) {
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit(CLIENT_LOGIN);
      resolve(socket);
    });

    socket.on('connect_error', error => {
      toast.error(error.message);
    });
  });
}
