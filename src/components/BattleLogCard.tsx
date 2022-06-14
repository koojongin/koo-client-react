import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import _ from 'lodash';
import moment from 'moment';
import { ResponseFetchBattle } from '../interfaces/fetch-battle.response';
import { ERROR_COLOR, MAIN_COLOR_LIGHT } from '../config/variables';

const StyledBattleLogCard = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px gainsboro;
  border-radius: 5px;
  padding: 10px;
  .message-line-monster-desc {
    display: inline-flex;
    padding: 0 10px 0 0;
    align-items: center;
    margin-bottom: 5px;
    border: dashed 1px black;
    border-radius: 10px;
    .image-wrapper {
      margin-right: 10px;
      width: 100px;
      height: 100px;
      position: relative;
    }
  }

  .battle-log-wrapper {
    padding-bottom: 5px;
    .battle-log-turn-box {
      color: #212529;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 3px;
    }
  }
`;
function ResultBlock({ battleResult }: { battleResult: ResponseFetchBattle }) {
  const { isWin } = battleResult;
  /** **
   * 승리시
   */
  if (isWin)
    return (
      <div style={{ color: MAIN_COLOR_LIGHT }}>
        <div>승리!</div>
        <div>
          <span style={{ marginRight: '5px' }}>
            +{battleResult.battleLogs[0].gold}Gold
          </span>
          <span>+{battleResult.battleLogs[0].exp}Exp</span>
        </div>
      </div>
    );

  /** *
   * 패배시
   */
  return (
    <div style={{ color: ERROR_COLOR }}>
      <div>패배!</div>
    </div>
  );
}
export default function BattleLogCard({
  battleResult,
}: {
  battleResult: ResponseFetchBattle;
} & React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { monster, battleLogs } = battleResult;
  return (
    <StyledBattleLogCard>
      <div>전투일시 {moment(battleResult.timestamp).format('hh:mm:ss')}</div>
      <div className="message-line-monster-desc">
        <div className="image-wrapper">
          <Image
            src={monster.thumbnail}
            alt={monster.name}
            layout="fill"
            objectFit="scale-down"
            placeholder="empty"
          />
        </div>
        <div>{monster.name}(을/를) 만났습니다.</div>
      </div>
      <div>
        {battleLogs.map(battleLog => {
          return (
            <div
              className="battle-log-wrapper"
              key={`monster-phase-${battleLog.phase}`}
            >
              <div className="battle-log-turn-box">{battleLog.phase} Turn</div>
              <div className={battleLog.isCritical ? 'glow' : ''}>
                <span>{battleLog.turnDamage.toFixed(2)}의 데미지!</span>
                <span>
                  [남은 적체력:{_.max([0, battleLog.monsterHP.toFixed(0)])}]
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <ResultBlock battleResult={battleResult} />
    </StyledBattleLogCard>
  );
}
