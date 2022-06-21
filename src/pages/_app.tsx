import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import socketio, { Socket } from 'socket.io-client';
import GlobalSetting from '../config/GlobalSetting';
import { initSocketEvents, SocketContext } from '../context/SocketContext';
import { SOCKET_SERVER_URI } from '../constants';
import ChatContainer from '../components/ChatContainer';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [isConnectedSocket, setIsConnectedSocket] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const socketInstance = socketio(SOCKET_SERVER_URI, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSocket(socketInstance);
  }, []);

  useEffect(() => {
    if (!socket) return;
    initSocketEvents(socket).then(() => {
      setIsConnectedSocket(true);
    });
  }, [socket, isConnectedSocket]);

  return getLayout(
    <GlobalSetting>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <SocketContext.Provider value={{ socket, connected: isConnectedSocket }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ChatContainer {...pageProps} />
        </div>
      </SocketContext.Provider>
    </GlobalSetting>,
  );
}
