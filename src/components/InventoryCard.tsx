import Tippy from '@tippyjs/react';
import styled from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResponseInventory } from '../interfaces/fetch-user.response';
import ItemCard from './ItemCard';
import { IItem } from '../interfaces/item';
import { ITEM_GRADES } from '../constants';
import {
  ITEM_MAGIC_COLOR,
  ITEM_NORMAL_COLOR,
  ITEM_RARE_COLOR,
} from '../config/variables';
import { InventorySortType } from '../interfaces/types';
import { fetchInventory } from '../services/user.service';
import { getItemURL } from '../services/item.util';
import ItemActionCard from './ItemActionCard';

const StyledInventoryCard = styled.div`
  *::selection {
    color: initial;
  }
  padding: 15px;
  border: solid 1px gainsboro;
  border-radius: 5px;

  .item-list {
    > div {
      display: flex;
      flex-wrap: wrap;
    }
    .disabled-normal .grade-normal {
      display: none;
    }
    .disabled-magic .grade-magic {
      display: none;
    }
    .disabled-rare .grade-rare {
      display: none;
    }
  }
`;
const StyledItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-radius: 5px;
  margin-right: 1px;
  margin-bottom: 1px;
  border-width: 2px;
  cursor: pointer;
  opacity: 1;

  &:hover {
    background: white;
    z-index: 1;
    border-style: dashed;
  }

  &.grade-normal {
    border-color: ${ITEM_NORMAL_COLOR};
  }

  &.grade-magic {
    border-color: ${ITEM_MAGIC_COLOR};
  }

  &.grade-rare {
    border-color: ${ITEM_RARE_COLOR};
  }
`;

function ItemBox({
  item,
  onClickEquipmentResult,
  onClickSellResult,
}: {
  item: IItem;
  onClickEquipmentResult?: (result?: boolean) => void;
  onClickSellResult?: () => void;
}) {
  const { iType, calculatedCharacterData } = item;
  const { averageDamage } = calculatedCharacterData;
  const itemActionElementRef = useRef(null);
  return (
    <StyledItemBox
      className={`grade-${item.grade?.toLowerCase()}`}
      style={{ position: 'relative' }}
    >
      <Tippy placement="right" content={ItemCard({ item })} zIndex={4}>
        <div>
          <Tippy
            placement="top"
            interactive
            hideOnClick
            className="item-action-card-tippy"
            content={ItemActionCard({
              item,
              parent: itemActionElementRef,
              equip: true,
              sell: true,
              link: true,
              onClickEquipmentResult,
              onClickSellResult,
            })}
            arrow={false}
            ref={itemActionElementRef}
            zIndex={5}
            trigger="click"
          >
            <div style={{ width: 40, height: 40, position: 'relative' }}>
              <Image
                alt={item.name}
                placeholder="empty"
                objectFit="scale-down"
                layout="fill"
                src={getItemURL(item.thumbnail)}
              />
            </div>
          </Tippy>
        </div>
      </Tippy>
      {iType === 'Weapon' && (
        <div style={{ position: 'absolute', fontSize: 10, left: 0, top: 0 }}>
          {averageDamage.toFixed(0)}
        </div>
      )}
    </StyledItemBox>
  );
}

export default function InventoryCard({
  inventoryResult: passedInventoryResult,
  onChangeInventory,
  onChangeSortSelection,
  onChangeGradeSelection,
}: {
  inventoryResult: ResponseInventory | undefined;
  onChangeInventory?: () => void;
  onChangeSortSelection?: (sort: InventorySortType) => void;
  onChangeGradeSelection?: (
    checkedState: { grade: string; checked: boolean }[],
  ) => void;
}) {
  const inventorySortTypes = ['createdAt', 'damage', 'name'];
  const [inventoryResult, setInventoryResult] = useState<ResponseInventory>();
  const [selectedSortOption, setSelectedSortOption] =
    useState<InventorySortType>('createdAt');
  const [checkedState, setCheckedState] = useState(
    ITEM_GRADES.map(grade => ({ grade, checked: true })),
  );
  const translateSortType = (value: string) => {
    if (value === 'createdAt') return '획득일순';
    if (value === 'damage') return '전투력순';
    if (value === 'name') return '이름순';
    return value;
  };

  const translateGrade = (_grade: string) => {
    const grade = _grade.toLowerCase();
    if (grade === 'normal') return '일반';
    if (grade === 'magic') return '마법';
    if (grade === 'rare') return '희귀';
    return _grade;
  };

  const onChangeGradeCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const {
      target: { checked },
    } = event;
    const newState = [...checkedState];
    newState[index].checked = checked;
    setCheckedState(newState);
    if (onChangeGradeSelection) onChangeGradeSelection(checkedState);
  };

  const onChangeSortType = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const {
        target: { value },
      } = event;
      setSelectedSortOption(value);
    },
    [selectedSortOption],
  );

  const loadAndSetInventory = async () => {
    const result = await fetchInventory(selectedSortOption);
    setInventoryResult(result);
  };

  useEffect(() => {
    setInventoryResult(passedInventoryResult);
  }, [passedInventoryResult]);

  useEffect(() => {
    if (onChangeSortSelection) onChangeSortSelection(selectedSortOption);
    loadAndSetInventory().catch(console.error);
  }, [selectedSortOption]);

  return (
    <StyledInventoryCard>
      <div>
        <div>
          인벤토리
          <Tippy
            placement="auto"
            content={
              <div>
                <div>* 아이템은 최근 획득 순으로 정렬됩니다.</div>
                <div>* 아이템 왼쪽상단 표기는 전투력입니다.</div>
              </div>
            }
          >
            <span>
              <FontAwesomeIcon icon="circle-question" />
            </span>
          </Tippy>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            {checkedState.map((gradeWrapper, index) => {
              const { grade, checked } = gradeWrapper;
              return (
                <label key={`check-${grade}`} style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    value={grade}
                    checked={checked}
                    onChange={event => onChangeGradeCheck(event, index)}
                  />
                  {translateGrade(grade)}
                </label>
              );
            })}
          </div>
          <select
            style={{ fontSize: 12 }}
            value={selectedSortOption}
            onChange={onChangeSortType}
          >
            {inventorySortTypes.map(sortType => {
              return (
                <option key={sortType} value={sortType}>
                  {translateSortType(sortType)}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 5 }}>
        <div className="item-list">
          {!inventoryResult && (
            <div
              style={{
                width: '100%',
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon="spinner" spin pulse fontSize={40} />
            </div>
          )}
          <div
            className={checkedState
              .filter(gradeWrapper => !gradeWrapper.checked)
              .map(gradeWrapper => {
                const { grade } = gradeWrapper;
                return `disabled-${grade.toLowerCase()}`;
              })
              .join(' ')}
          >
            {inventoryResult &&
              inventoryResult.items.map((item, index: number) => {
                return (
                  <ItemBox
                    key={`inventory-item-${index + 0}`}
                    item={item}
                    onClickEquipmentResult={async () => {
                      await loadAndSetInventory();
                      if (onChangeInventory) onChangeInventory();
                    }}
                    onClickSellResult={async () => {
                      await loadAndSetInventory();
                      if (onChangeInventory) onChangeInventory();
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </StyledInventoryCard>
  );
}
