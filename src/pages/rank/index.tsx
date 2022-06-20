import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ResponseRanks } from '../../interfaces/ranks.response';
import { fetchRank } from '../../services/game.service';
import { getUserAvatarURL } from '../../components/UserInfoCard';
import { LAYOUT_MAX_WIDTH, LAYOUT_MIN_WIDTH } from '../../config/variables';

const StyledRank = styled.div`
  min-width: ${LAYOUT_MIN_WIDTH}px;
  width: ${LAYOUT_MIN_WIDTH}px;
  max-width: ${LAYOUT_MAX_WIDTH}px;
  padding: 5px;
  text-align: center;
  box-sizing: border-box;
`;
function RankPage() {
  const [ranks, setRanks] = useState<ResponseRanks>({ characters: [] });
  useEffect(() => {
    const loadRanks = async () => {
      const response = await fetchRank();
      setRanks(response);
    };

    loadRanks().catch(console.error);
  }, []);

  return (
    <StyledRank>
      <div
        style={{
          display: 'flex',
          padding: 10,
          borderBottom: 'solid 1px gainsboro',
        }}
      >
        <div style={{ minWidth: 35, marginRight: 10 }}>순위</div>
        <div style={{ minWidth: 30, marginRight: 10 }} />
        <div
          style={{
            minWidth: 120,
            marginRight: 10,
          }}
        >
          유저명
        </div>
        <div style={{ minWidth: 50, marginRight: 10 }}>레벨</div>
        <div>전투력</div>
      </div>
      {ranks?.characters.map((character, index) => {
        const { calculatedCharacterData, user } = character;
        return (
          <div
            key={character.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 10px',
              borderBottom: 'solid 1px gainsboro',
            }}
          >
            <div style={{ minWidth: 35, marginRight: 10 }}>{index + 1}</div>
            <div
              style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}
            >
              <Image
                alt="user-avatar"
                style={{ borderRadius: '50%' }}
                width={30}
                height={30}
                src={getUserAvatarURL(user)}
                onError={() => {
                  user.avatar = '';
                  setRanks({ ...ranks });
                }}
              />
            </div>
            <div
              style={{
                minWidth: 120,
                maxWidth: 120,
                marginRight: 10,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.username}
            </div>
            <div
              style={{
                minWidth: 50,
                maxWidth: 50,
                marginRight: 10,
              }}
            >
              {character.level}
            </div>
            <div>
              {calculatedCharacterData.averageDamage
                .toFixed(0)
                .toLocaleString()}
            </div>
          </div>
        );
      })}
    </StyledRank>
  );
}
export default RankPage;
