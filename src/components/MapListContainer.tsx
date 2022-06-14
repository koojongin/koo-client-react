import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import _ from 'lodash';
import { IMap } from '../interfaces/map';
import { IMonster } from '../interfaces/monster';

interface MapListCardProps extends React.HTMLAttributes<HTMLElement> {
  maps: IMap[];
}

interface MonsterCardProps {
  monster: IMonster;
}
const MapListCardStyle = styled.div`
  padding: 10px;
  border: solid 1px gainsboro;
`;
const MonsterCardStyle = styled.div``;
const StyledMonsterTooltip = styled.div`
  min-width: 300px;
  .desc-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
function MonsterTooltip({ monster }: { monster: IMonster }) {
  const { dropList, thumbnail, maxHP, name, gold, exp } = monster;
  return (
    <StyledMonsterTooltip>
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        <Image src={thumbnail} alt={name} layout="fill" objectFit="contain" />
      </div>
      <div style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</div>
      <hr style={{ borderColor: 'white' }} />
      <div>
        <div className="desc-row">
          <span>HP</span>
          <span>{maxHP.toLocaleString()}</span>
        </div>
        <div className="desc-row">
          <span>처치시 골드</span>
          <span>{gold.toLocaleString()}</span>
        </div>
        <div className="desc-row">
          <span>처치시 골드</span>
          <span>{exp.toLocaleString()}</span>
        </div>
      </div>
      <hr style={{ borderColor: 'white' }} />
      <div>
        {dropList.map(item => {
          const { name: itemName, rate } = item;
          return (
            <div
              key={itemName}
              style={{ marginRight: 5, display: 'inline-flex' }}
            >
              {itemName}({rate}%)
            </div>
          );
        })}
      </div>
    </StyledMonsterTooltip>
  );
}
function MonsterCard({ monster }: MonsterCardProps) {
  return (
    <MonsterCardStyle key={monster.id}>
      <Tippy content={<MonsterTooltip monster={monster} />} placement="auto">
        <div style={{ position: 'relative', width: 30, height: 30 }}>
          <Image
            alt={monster.name}
            src={monster.thumbnail}
            layout="fill"
            objectFit="scale-down"
          />
        </div>
      </Tippy>
    </MonsterCardStyle>
  );
}
export default function MapListContainer({ maps = [] }: MapListCardProps) {
  return (
    <MapListCardStyle>
      <div style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>
        맵정보
        <hr />
      </div>
      {maps.map((map: IMap) => {
        const { containMonsters: monsters } = map;
        const monstersElementList = _.sortBy(monsters, 'maxHP').map(monster => (
          <div key={monster.name} style={{ marginRight: 5 }}>
            <MonsterCard monster={monster} />
          </div>
        ));
        return (
          <div key={`test-${map.id}`}>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{map.name}</div>
            <div style={{ display: 'flex' }}>{monstersElementList}</div>
          </div>
        );
      })}
    </MapListCardStyle>
  );
}
