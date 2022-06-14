import styled from 'styled-components';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import React, { useRef } from 'react';
import { ResponseMe } from '../interfaces/fetch-user.response';
import { DEFAULT_DISCORD_AVATAR_URL, DISCORD_AVATAR_URL } from '../constants';
import Button from './atoms/button';
import ItemCard from './ItemCard';
import { getItemURL } from '../services/item.util';
import ItemActionCard from './ItemActionCard';

const getUserAvatarURL = (user: { userId: string; avatar: string }) => {
  if (user && user.userId && user.avatar) {
    return `${DISCORD_AVATAR_URL}${user.userId}/${user.avatar}.png`;
  }
  return DEFAULT_DISCORD_AVATAR_URL;
};
const StyledUserInfoCard = styled.div`
  border: solid 1px gainsboro;
  padding: 15px;
  border-radius: 5px;
  font-size: 14px;

  .card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > :nth-child(1) {
      min-width: 50px;
    }
  }
`;

export default function UserInfoCard({
  meResult,
  onChangeUserState,
}: {
  meResult: ResponseMe;
  onChangeUserState?: () => void;
}) {
  const { nextExp, character, calculatedCharacterData: cData } = meResult;
  const { user, equipedWeapon } = character;
  const currentExpPercent = (character.exp / nextExp) * 100;
  const itemActionElementRef = useRef(null);
  return (
    <StyledUserInfoCard>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="user-avatar"
          style={{ borderRadius: '50%' }}
          width={50}
          height={50}
          src={getUserAvatarURL(user)}
        />
        <div style={{ marginLeft: 10 }}>
          <div style={{ fontSize: 18, marginBottom: 5 }}>{user.username}</div>
          <Button>내 정보 변경</Button>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div className="card-row">
          <div>레벨</div>
          <div>{character.level}</div>
        </div>
        <div className="card-row">
          <div>경험치</div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '5px 0px 5px 10px',
            }}
          >
            <Tippy
              content={`EXP: ${character.exp.toLocaleString()} / ${nextExp.toLocaleString()}`}
            >
              <div
                className="exp-bar"
                style={{
                  position: 'relative',
                  maxWidth: 150,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: 'solid 1px gainsboro',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    background: '#9cccff',
                    width: '54%',
                    height: '100%',
                    left: 0,
                  }}
                />
                <div style={{ position: 'absolute' }} />
                <div style={{ position: 'absolute' }}>
                  {currentExpPercent.toFixed(2)}%
                </div>
              </div>
            </Tippy>
          </div>
        </div>

        <div className="card-row">
          <div>골드</div>
          <div>{character.gold.toLocaleString()}</div>
        </div>
        <hr />
        <div className="card-row">
          <div>물리피해</div>
          <div>{cData.totalDamageOfPhysical}</div>
        </div>
        <div className="card-row">
          <div>냉기피해</div>
          <div>{cData.totalDamageOfIce}</div>
        </div>
        <div className="card-row">
          <div>화염피해</div>
          <div>{cData.totalDamageOfFire}</div>
        </div>
        <div className="card-row">
          <div>번개피해</div>
          <div>{cData.totalDamageOfLightning}</div>
        </div>
        <div className="card-row">
          <div>치명타 확률</div>
          <div>{(cData.totalCriticalChanceScore / 10).toFixed(2)}%</div>
        </div>
        <div className="card-row">
          <div>치명타 배율</div>
          <div>+{cData.totalCriticalMultiplier}%</div>
        </div>
        <div className="card-row">
          <div>전투력</div>
          <div>{cData.averageDamage.toFixed(2)}</div>
        </div>
        <hr />
        <div>
          <div style={{ marginBottom: 5 }}>장비</div>
          {equipedWeapon && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Tippy
                placement="auto"
                content={ItemCard({ item: equipedWeapon })}
              >
                <div>
                  <Tippy
                    interactive
                    hideOnClick
                    className="item-action-card-tippy"
                    content={ItemActionCard({
                      item: equipedWeapon,
                      parent: itemActionElementRef,
                      unequip: true,
                      onClickUnequipmentResult: () => {
                        if (onChangeUserState) onChangeUserState();
                      },
                    })}
                    arrow={false}
                    ref={itemActionElementRef}
                    zIndex={10}
                    trigger="click"
                  >
                    <div
                      style={{
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
                </div>
              </Tippy>
              <div style={{ marginLeft: 5 }}>{equipedWeapon.name}</div>
            </div>
          )}
          {!equipedWeapon && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  border: 'solid 1px',
                  width: 40,
                  height: 40,
                }}
              />
              <div style={{ marginLeft: 10 }}>미착용</div>
            </div>
          )}
        </div>
      </div>
    </StyledUserInfoCard>
  );
}
