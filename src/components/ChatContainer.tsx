import styled from 'styled-components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { SocketContext } from '../context/SocketContext';
import { CHAT_MESSAGE_MAX_LENGTH, SOCKET_EVENT } from '../constants';
import { ICharacter } from '../interfaces/character';
import Button from './atoms/button';
import { MAIN_COLOR_LIGHT } from '../config/variables';

function DefaultMessageBox({ message }: { message: string }) {
  return (
    <span
      style={{
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
      }}
    >
      {message}
    </span>
  );
}
const StyledChatContainer = styled.div`
  width: 400px;
  box-sizing: border-box;
  border: solid 1px gainsboro;
  border-radius: 5px;

  input {
    border: none;
    background: transparent;
    width: 100%;

    &:focus-visible,
    &:focus,
    &:active {
      border: none;
      outline: none;
    }

    &::placeholder {
      color: #565656;
    }
  }
`;

interface IMessageWrapper {
  message: string;
  character: ICharacter;
  actionType?: 'base' | 'login' | string;
  timestamp?: Date;
}
export default function ChatContainer() {
  const [socket] = useContext(SocketContext);
  const [isChatMode, setIsChatMode] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [messageWraps, setMessageWraps] = useState<IMessageWrapper[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ICharacter[]>([]);
  const messageListElement = useRef<HTMLDivElement>(null);

  const sendMessage = (message: string) => {
    setInputMessage('');
    socket?.emit(SOCKET_EVENT.CLIENT_MESSAGE, { message });
  };

  const onChangeMessageInput = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setInputMessage(target.value);
  };
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    const { key } = event;
    const target = event.target as HTMLInputElement;
    if (key !== 'Enter') return;
    const message = target?.value;
    sendMessage(message);
  };

  const addMessage = (_message: IMessageWrapper) => {
    const message = { ..._message, timestamp: new Date() };
    setMessageWraps(originMessageWraps => {
      const mergedMessages = [...originMessageWraps, message];
      if (mergedMessages.length > CHAT_MESSAGE_MAX_LENGTH) {
        const distance = CHAT_MESSAGE_MAX_LENGTH - mergedMessages.length;
        return mergedMessages.slice(distance);
      }
      return mergedMessages;
    });
  };
  useEffect(() => {
    socket?.on(SOCKET_EVENT.REFRESH_CONNECTED_USER, (data: any) => {
      const { connectedUsers: cu } = data;
      setConnectedUsers(cu);
    });

    socket?.on(
      SOCKET_EVENT.CLIENT_MESSAGE,
      (data: { message: string; character: ICharacter }) => {
        const { message, character } = data;
        addMessage({
          actionType: 'base',
          message,
          character,
        });
      },
    );

    socket?.on(SOCKET_EVENT.CLIENT_LOGIN, (data: { character: ICharacter }) => {
      const { character } = data;
      const { user } = character;
      const messageWrap = {
        character,
        actionType: 'login',
        message: `${user.username}님이 로그인하셨습니다.`,
      };
      addMessage(messageWrap);
    });

    if (socket?.connected) {
      socket?.emit(SOCKET_EVENT.REFRESH_CONNECTED_USER);
    }

    return () => {
      socket?.off(SOCKET_EVENT.REFRESH_CONNECTED_USER);
      socket?.off(SOCKET_EVENT.CLIENT_MESSAGE);
      socket?.off(SOCKET_EVENT.CLIENT_LOGIN);
    };
  }, [socket, socket?.connected]);

  useEffect(() => {
    if (!messageListElement?.current) return;
    const { current } = messageListElement;
    current.scrollTop = current.scrollHeight;
  }, [messageWraps, messageWraps.length]);

  return (
    <StyledChatContainer>
      <div style={{ display: isChatMode ? 'none' : 'inherit' }}>
        <div
          style={{
            display: 'flex',
            padding: 10,
            justifyContent: 'space-between',
          }}
        >
          <div>커뮤니티</div>
          <div>
            <Tippy content="채팅으로 돌아가기">
              <div
                tabIndex={0}
                role="button"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsChatMode(!isChatMode);
                }}
              >
                <FontAwesomeIcon icon="message" fontSize={14} />
              </div>
            </Tippy>
          </div>
        </div>
        <div>
          <div
            style={{
              padding: '0 10px',
            }}
          >
            <div>
              <FontAwesomeIcon icon="users" fontSize={14} />
              <span style={{ marginLeft: 10, fontWeight: 'bold' }}>
                접속자 수 ({Object.keys(connectedUsers).length.toLocaleString()}
                )
              </span>
            </div>
            <div style={{ padding: '12px 0', fontSize: 14, fontWeight: 100 }}>
              활동 중인 사용자
            </div>
          </div>
          <div style={{ padding: '0 10px' }}>
            {Object.keys(connectedUsers).map((key: any) => {
              const character = connectedUsers[key];
              const { user } = character;
              return (
                <div key={`chat-userid-${user.username}`}>{user.username}</div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: !isChatMode ? 'none' : 'inherit' }}>
        <div
          style={{
            display: 'flex',
            padding: 10,
            justifyContent: 'space-between',
          }}
        >
          <div>
            실시간 채팅
            <span style={{ fontSize: 12, marginLeft: 5 }}>
              ({Object.keys(connectedUsers).length.toLocaleString()})
            </span>
          </div>
          <div>
            <Tippy content="접속자 정보">
              <div
                tabIndex={0}
                role="button"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsChatMode(!isChatMode);
                }}
              >
                <FontAwesomeIcon icon="users" fontSize={14} />
              </div>
            </Tippy>
          </div>
        </div>
        <div
          style={{
            padding: 10,
            maxHeight: 600,
            minHeight: 400,
            overflowY: 'scroll',
            overflowX: 'auto',
          }}
          ref={messageListElement}
        >
          {messageWraps.map((messageWrap, index) => {
            const { actionType = 'base', message, character } = messageWrap;
            const { user } = character;
            return (
              <div
                key={`message-${character.id}-${index + 0}`}
                style={{ marginBottom: 5, fontSize: 14, lineHeight: 1.5 }}
              >
                {actionType === 'base' && (
                  <div>
                    <span style={{ cursor: 'pointer' }}>
                      <span
                        style={{
                          background: MAIN_COLOR_LIGHT,
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: 5,
                          marginRight: 3,
                          fontSize: 12,
                        }}
                      >
                        {character.level}
                      </span>
                      <span>{user.username}</span>
                    </span>
                    <span>: </span>
                    <DefaultMessageBox message={message} />
                  </div>
                )}

                {actionType === 'login' && (
                  <div>
                    <DefaultMessageBox message={message} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ margin: 10 }}>
          <div style={{ background: '#f7f7f8', padding: 10, borderRadius: 5 }}>
            <input
              placeholder="메세지 보내기"
              onKeyDown={onKeyDownHandler}
              onChange={onChangeMessageInput}
              value={inputMessage}
            />
          </div>
          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <Button
              style={{ lineHeight: 1.3 }}
              onClick={() => sendMessage(inputMessage)}
            >
              채팅
            </Button>
          </div>
        </div>
      </div>
    </StyledChatContainer>
  );
}
