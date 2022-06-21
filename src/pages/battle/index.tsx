import styled from 'styled-components';
import React, { useState } from 'react';
import { IMap } from '../../interfaces/map';
import { fetchMaps } from '../../services/game.service';
import MapListContainer from '../../components/MapListContainer';
import BattleContainer from '../../components/BattleContainer';
import Button from '../../components/atoms/button';
import SkillListContainer from '../../components/SkillListContainer';
import { LAYOUT_MAX_WIDTH, LAYOUT_MIN_WIDTH } from '../../config/variables';

const StyledElement = styled.div`
  min-width: ${LAYOUT_MIN_WIDTH}px;
  width: ${LAYOUT_MIN_WIDTH}px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  max-width: ${LAYOUT_MAX_WIDTH}px;
  padding: 5px;
`;

interface IBattleListMenu {
  name: string;
  onClick?: (event?: React.MouseEvent) => void;
  component: JSX.Element;
}
export default function BattlePage() {
  const [maps, setMaps] = useState<IMap[]>([]);
  const [isFixedHide, setIsFixedHide] = useState(false);
  const onClickMapListButton = async () => {
    const loadMaps = async () => {
      const { gameMaps = [] } = await fetchMaps();
      setMaps(gameMaps);
    };
    loadMaps();
  };
  const onClickSkillButton = () => {};
  const onClickItemDBButton = () => {};
  const onClickMonsterDBButton = () => {};
  const MENU_LIST: IBattleListMenu[] = [
    {
      name: '스킬',
      onClick: onClickSkillButton,
      component: <SkillListContainer />,
    },
    {
      name: '맵정보',
      onClick: onClickMapListButton,
      component: <MapListContainer maps={maps} />,
    },
    {
      name: '아이템DB',
      onClick: onClickItemDBButton,
      component: (
        <a
          href="http://jiku90.com/item/item.html"
          target="_blank"
          rel="noreferrer"
        >
          아이템DB 페이지 바로가기
        </a>
      ),
    },
    {
      name: '몬스터DB',
      onClick: onClickMonsterDBButton,
      component: (
        <a
          href="http://jiku90.com/monster/monster.html"
          target="_blank"
          rel="noreferrer"
        >
          몬스터DB 페이지 바로가기
        </a>
      ),
    },
  ];

  const [selectedMenu, setSelectedMenu] = useState('');
  const onChangeMenu = (menu: IBattleListMenu) => {
    if (menu.name === selectedMenu && !isFixedHide) {
      return setIsFixedHide(true);
    }
    setIsFixedHide(false);
    return setSelectedMenu(menu.name);
  };

  return (
    <StyledElement>
      <div>
        {MENU_LIST.map((menu, index) => {
          return (
            <Button
              style={{ marginRight: 5 }}
              key={`${index + 0}`}
              onClick={event => {
                menu.onClick?.(event);
                onChangeMenu(menu);
              }}
            >
              {menu.name}
            </Button>
          );
        })}
      </div>
      <div style={{ marginBottom: 10 }}>
        {MENU_LIST.map(menu => {
          const isShowCondition = selectedMenu === menu.name && !isFixedHide;
          return (
            <div key={menu.name} className={isShowCondition ? '' : 'hide'}>
              {menu.component}
            </div>
          );
        })}
      </div>
      <div>
        <BattleContainer />
      </div>
    </StyledElement>
  );
}
