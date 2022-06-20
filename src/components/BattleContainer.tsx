import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useInterval } from 'usehooks-ts';
import { fetchBattle, fetchMaps } from '../services/game.service';
import { IMap } from '../interfaces/map';
import { ResponseFetchBattle } from '../interfaces/fetch-battle.response';
import { fetchInventory, fetchMe } from '../services/user.service';
import { BATTLE_COOLTIME, SOCKET_EVENT } from '../constants';
import { WHITE_GRAY_COLOR } from '../config/variables';
import Button from './atoms/button';
import BattleLogCard from './BattleLogCard';
import UserInfoCard from './UserInfoCard';
import {
  ResponseInventory,
  ResponseMe,
} from '../interfaces/fetch-user.response';
import InventoryCard from './InventoryCard';
import { InventorySortType } from '../interfaces/types';
import { SocketContext } from '../context/SocketContext';

const StyledBattleContainer = styled.div`
  select {
    padding: 6px;
    border-color: ${WHITE_GRAY_COLOR};
    &:focus {
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.1rem rgb(0 123 255 / 25%);
    }
  }
`;

export default function BattleContainer() {
  const [socket] = useContext(SocketContext);
  const [isRunningAutoBattle, setIsRunningAutoBattle] = useState(false);
  const [maps = [], setMaps] = useState<IMap[]>();
  const [meResult, setMeResult] = useState<ResponseMe>();
  const [inventoryResult, setInventoryResult] = useState<ResponseInventory>();
  const [selectedMap, setSelectedMap] = useState<string>();
  const [lastBattleResult, setLastBattleResult] =
    useState<ResponseFetchBattle>();
  const [selectedSortOption, setSelectedSortOption] =
    useState<InventorySortType>();

  const loadAndSetUserData = async () => {
    const result = await fetchMe();
    setMeResult(result);
  };

  const loadAndSetInventoryData = async (sort = selectedSortOption) => {
    const result = await fetchInventory(sort);
    setInventoryResult(() => ({ ...result }));
  };

  const battle = async () => {
    const response = await fetchBattle({
      gameMapName: selectedMap,
    });
    setLastBattleResult({ timestamp: new Date(), ...response });

    const { dropList, isLevelUp } = response;
    if (isLevelUp) {
      socket?.emit(SOCKET_EVENT.REFRESH_CONNECTED_USER);
    }
    await loadAndSetUserData();
    if (dropList.length > 0) await loadAndSetInventoryData();
  };

  const onChangeSortSelection = (sortOption: InventorySortType) => {
    setSelectedSortOption(sortOption);
    // await loadAndSetInventoryData();
  };
  const onClickAutoBattle = async () => {
    setIsRunningAutoBattle(!isRunningAutoBattle);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSelectedMap(value);
  };

  useEffect(() => {
    if (isRunningAutoBattle) battle();
  }, [isRunningAutoBattle]);
  useInterval(
    async () => {
      return battle();
    },
    isRunningAutoBattle ? BATTLE_COOLTIME : null,
  );

  useEffect(() => {
    const loadMaps = async () => {
      const { gameMaps = [] } = await fetchMaps();
      setMaps(gameMaps);
      const [intialMap] = gameMaps;
      if (intialMap) setSelectedMap(intialMap.name);
    };

    Promise.all([loadMaps(), loadAndSetUserData(), loadAndSetInventoryData()]);
  }, []);

  useEffect(() => {
    if (!lastBattleResult) return;
    const { dropList } = lastBattleResult;
    if (dropList.length === 0) return;
    toast(
      `[${moment().format('hh:mm:ss')}] ${dropList
        ?.map(item => item.name)
        .join(', ')}`,
      {
        className: 'itemdrop',
        autoClose: false,
      },
    );
  }, [lastBattleResult]);

  return (
    <StyledBattleContainer>
      <div style={{ marginBottom: 10 }}>
        <select onChange={onChangeHandler} disabled={isRunningAutoBattle}>
          {maps.map(map => {
            return (
              <option value={map.name} key={`map-${map.id}`}>
                {map.name}
              </option>
            );
          })}
        </select>
        <Button type="button" onClick={() => onClickAutoBattle()}>
          자동사냥{isRunningAutoBattle ? '중단' : ''}
        </Button>
      </div>
      <div style={{ display: 'flex' }}>
        {meResult && (
          <div style={{ width: 300 }}>
            <UserInfoCard
              meResult={meResult}
              onChangeUserState={async () => {
                await Promise.all([
                  loadAndSetInventoryData(),
                  loadAndSetUserData(),
                ]);
              }}
            />
          </div>
        )}
        {lastBattleResult && (
          <div style={{ width: 400 }}>
            <BattleLogCard battleResult={lastBattleResult} />
          </div>
        )}
      </div>
      <div style={{ minWidth: 400 }}>
        <InventoryCard
          inventoryResult={inventoryResult}
          // onChangeSortSelection={async sortOption => {
          //   setSelectedSortOption(sortOption);
          //   await loadAndSetInventoryData();
          // }}
          onChangeSortSelection={data => {
            console.log(data);
            onChangeSortSelection(data);
          }}
          onChangeInventory={loadAndSetUserData}
        />
      </div>
    </StyledBattleContainer>
  );
}
