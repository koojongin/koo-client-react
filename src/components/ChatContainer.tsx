import styled from 'styled-components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import { SocketContext } from '../context/SocketContext';
import { CHAT_MESSAGE_MAX_LENGTH } from '../constants';
import { ICharacter } from '../interfaces/character';
import Button from './atoms/button';
import { MAIN_COLOR_LIGHT } from '../config/variables';
import {
  CLIENT_LOGIN,
  CLIENT_MESSAGE,
  REFRESH_CONNECTED_USER,
  SHARE_ITEM_LINK,
} from '../constants/socket.event';
import ItemCard from './ItemCard';
import { IItem } from '../interfaces/item';
import { getUserAvatarURL } from './UserInfoCard';
import { getItemURL } from '../services/item.util';

function UserProfileBox({ character }: { character: ICharacter }) {
  const { user, equipedWeapon } = character;
  return (
    <div
      style={{
        minWidth: 300,
        borderRadius: 5,
        boxShadow: '1px 1px 6px 1px #b5aeae',
      }}
    >
      <div style={{ display: 'flex', background: 'black', padding: 10 }}>
        <div style={{ marginRight: 10 }}>
          <Image
            alt="user-avatar"
            style={{ borderRadius: '50%' }}
            width={50}
            height={50}
            src={getUserAvatarURL(user)}
          />
        </div>
        <div style={{ fontSize: 20 }}>{user.username}</div>
      </div>
      <div style={{ background: 'white', color: `black`, padding: 10 }}>
        <div>레벨 {character.level}</div>
        {equipedWeapon && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tippy placement="auto" content={ItemCard({ item: equipedWeapon })}>
              <div
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  border: 'solid 1px',
                  width: 40,
                  height: 40,
                }}
              >
                <Image
                  alt={equipedWeapon.name}
                  src={getItemURL(equipedWeapon.thumbnail)}
                  layout="fill"
                  objectFit="scale-down"
                />
              </div>
            </Tippy>
            <div style={{ marginLeft: 5 }}>{equipedWeapon.name}</div>
          </div>
        )}
        {!equipedWeapon && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ minWidth: 40, minHeight: 40, border: 'solid 1px' }} />
            <div style={{ marginLeft: 5 }}>미착용</div>
          </div>
        )}
      </div>
    </div>
  );
}

function UserNameBox({ character }: { character: ICharacter }) {
  const { user } = character;
  return (
    <Tippy
      interactive
      className="user-profile-tippy no-padding no-border-radius"
      hideOnClick
      arrow={false}
      content={UserProfileBox({ character })}
      trigger="click"
    >
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
    </Tippy>
  );
}
function DefaultMessageBox({ message }: { message: string | JSX.Element }) {
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
  margin: 5px;

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
  message: string | JSX.Element;
  character: ICharacter;
  actionType?: 'base' | 'custon' | string;
  timestamp?: Date;
}
export default function ChatContainer() {
  const { socket, connected } = useContext(SocketContext);
  const [isChatMode, setIsChatMode] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [messageWraps, setMessageWraps] = useState<IMessageWrapper[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ICharacter[]>([]);
  const messageListElement = useRef<HTMLDivElement>(null);

  const sendMessage = (message: string) => {
    setInputMessage('');
    socket?.emit(CLIENT_MESSAGE, { message });
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
    if (connected === false) return;
    socket?.emit(REFRESH_CONNECTED_USER);
  }, [connected]);

  useEffect(() => {
    if (!socket) return () => {};
    socket.on(REFRESH_CONNECTED_USER, (data: any) => {
      const { connectedUsers: cu } = data;
      setConnectedUsers(cu);
    });

    socket.on(
      CLIENT_MESSAGE,
      (data: { message: string; character: ICharacter }) => {
        const { message, character } = data;
        addMessage({
          actionType: 'base',
          message,
          character,
        });
      },
    );

    socket.on(CLIENT_LOGIN, (data: { character: ICharacter }) => {
      const { character } = data;
      const { user } = character;
      const messageWrap = {
        character,
        actionType: 'custom',
        message: `${user.username}님이 로그인하셨습니다.`,
      };
      addMessage(messageWrap);
    });

    socket.on(
      SHARE_ITEM_LINK,
      (data: { character: ICharacter; item: IItem }) => {
        const { character, item } = data;
        const messageWrap = {
          character,
          actionType: 'custom',
          message: (
            <div>
              <UserNameBox character={character} />
              <span>: </span>
              <Tippy placement="auto" content={ItemCard({ item })}>
                <span
                  style={{
                    background: 'black',
                    cursor: 'pointer',
                    padding: '1px 2px',
                  }}
                  className={`item-color-${item.grade?.toLowerCase()}`}
                >
                  [{item.name}]
                </span>
              </Tippy>
            </div>
          ),
        };
        addMessage(messageWrap);
      },
    );

    return () => {
      socket.off(REFRESH_CONNECTED_USER);
      socket.off(CLIENT_MESSAGE);
      socket.off(CLIENT_LOGIN);
    };
  }, [socket]);

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
            return (
              <div
                key={`message-${character.id}-${index + 0}`}
                style={{ marginBottom: 5, fontSize: 14, lineHeight: 1.5 }}
              >
                {actionType === 'base' && (
                  <div>
                    <UserNameBox character={character} />
                    <span>: </span>
                    <DefaultMessageBox message={message} />
                  </div>
                )}

                {actionType === 'custom' && (
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
