import _ from 'lodash';
import Image from 'next/image';
import styled from 'styled-components';
import moment from 'moment';
import { IItem } from '../interfaces/item';
import {
  ITEM_MAGIC_COLOR,
  ITEM_NORMAL_COLOR,
  ITEM_RARE_COLOR,
} from '../config/variables';

const StyledItemCard = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .grade-normal {
    color: ${ITEM_NORMAL_COLOR};
  }

  .grade-magic {
    color: ${ITEM_MAGIC_COLOR};
  }

  .grade-rare {
    color: ${ITEM_RARE_COLOR};
  }

  .item-option-row {
    font-size: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-weight: bold;
      color: #9fadd4;
    }
    div {
      display: flex;
      align-items: center;
    }
  }

  .horizontal-row {
    width: 100%;
    border-top: dashed 1px gainsboro;
    margin: 5px 0;
  }
`;

export default function ItemCard({ item }: { item: IItem }) {
  const {
    name,
    starforce = 0,
    starforceLimit = 0,
    grade,
    criticalMultiplier = 0,
    damageOfFire = 0,
    damageOfIce = 0,
    damageOfLightning = 0,
    damageOfPhysical = 0,
    mods,
    gold,
    // reqLevel,
    createdAt,
    originItem,

    calculatedCharacterData,
  } = item;
  const translateGrade = (_grade = 'normal') => {
    const lowerGrade = _grade.toLowerCase();
    if (lowerGrade === 'normal') return '일반';
    if (lowerGrade === 'magic') return '마법';
    if (lowerGrade === 'rare') return '희귀';
    return 1;
  };

  const getOptionRange = (value: number | number[] = 0) => {
    let maximumRange;
    let minimumRange;
    if (typeof value === 'object') {
      const [min, max] = value;
      maximumRange = max;
      minimumRange = min;
    } else {
      maximumRange = value * 1.5;
      minimumRange = value * 0.5;
    }

    return `${minimumRange.toFixed(1)}~${maximumRange.toFixed(1)}`;
  };
  return (
    <StyledItemCard>
      <div style={{ display: 'flex' }}>
        {_.range(starforceLimit).map((star, index) => {
          const isActive = starforce >= index + 1;
          return (
            <div key={`starforce-${index + 0}`}>
              <Image
                width={12}
                height={12}
                placeholder="empty"
                src={`/resources/interface/starforce_${
                  isActive ? 'on' : 'off'
                }.png`}
                alt="starforce"
              />
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 16 }}>{name}</div>
      <div
        style={{ fontSize: 12 }}
        className={`grade-${grade?.toLocaleLowerCase()}`}
      >
        ({translateGrade(grade)} 아이템)
      </div>
      <div className="horizontal-row" />
      <div className="item-option-row">
        <div>물리피해</div>
        <div>
          {damageOfPhysical}
          {originItem && (
            <span>[{getOptionRange(originItem?.damageOfPhysical)}]</span>
          )}
        </div>
      </div>
      <div className="item-option-row">
        <div>화염피해</div>
        <div>
          {damageOfFire}
          {originItem && (
            <span>[{getOptionRange(originItem?.damageOfFire)}]</span>
          )}
        </div>
      </div>
      <div className="item-option-row">
        <div>냉기피해</div>
        <div>
          {damageOfIce}
          {originItem && (
            <span>[{getOptionRange(originItem?.damageOfIce)}]</span>
          )}
        </div>
      </div>
      <div className="item-option-row">
        <div>번개피해</div>
        <div>
          {damageOfLightning}
          {originItem && (
            <span>[{getOptionRange(originItem?.damageOfLightning)}]</span>
          )}
        </div>
      </div>
      <div className="item-option-row">
        <div>치명타배율</div>
        <div>{criticalMultiplier}</div>
      </div>
      <div className="horizontal-row" />
      <div className="item-option-row">
        <div>상점판매가</div>
        <div>{gold}</div>
      </div>
      <div className="item-option-row">
        <div>획득일시</div>
        <div>{moment(createdAt).format('yy/MM/DD hh:mm:ss')}</div>
      </div>

      {mods && mods.length > 0 && (
        <div style={{ width: '100%' }}>
          <div className="horizontal-row" style={{ borderTopStyle: 'solid' }} />
          <div>추가 옵션(Mods)</div>
          {mods.map((mod, index) => {
            return (
              <div key={`item-mod-${index + 0}`} className="item-option-row">
                <div>{mod.nameKr}</div>
                <div>
                  {mod.value}
                  <span>[{getOptionRange(mod.range)}]</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {calculatedCharacterData && calculatedCharacterData.averageDamage && (
        <>
          <div className="horizontal-row" />
          <div className="item-option-row">
            <div>착용시 전투력</div>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>
              {calculatedCharacterData?.averageDamage
                .toFixed(2)
                .toLocaleString()}
            </div>
          </div>
        </>
      )}
    </StyledItemCard>
  );
}
