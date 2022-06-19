import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { SOCKET_EVENT } from '../constants';
import { ICharacter } from '../interfaces/character';

const StyledChatContainer = styled.div`
  width: 400px;
  border: solid 1px gainsboro;
`;

export default function ChatContainer() {
  const [socket] = useContext(SocketContext);
  const [connectedUsers, setConnectedUsers] = useState<ICharacter[]>([]);
  useEffect(() => {
    socket?.on(SOCKET_EVENT.REFRESH_CONNECTED_USER, (data: any) => {
      const { connectedUsers: cu } = data;
      setConnectedUsers(cu);
    });
    if (socket?.connected) {
      socket?.emit(SOCKET_EVENT.REFRESH_CONNECTED_USER);
    }

    return () => {
      socket?.off(SOCKET_EVENT.REFRESH_CONNECTED_USER);
    };
  }, [socket, socket?.connected]);

  return (
    <StyledChatContainer>
      <div>
        {Object.keys(connectedUsers).map((key: any) => {
          const character = connectedUsers[key];
          const { user } = character;
          return (
            <div key={`chat-userid-${user.username}`}>{user.username}</div>
          );
        })}
      </div>
      {/*<div>chat</div>*/}
      {/*<div>input</div>*/}
    </StyledChatContainer>
  );
}
