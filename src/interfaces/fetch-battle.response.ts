import { IMonster } from './monster';
import { IBattleLog } from './battle-log';
import { IItem } from './item';

export interface ResponseFetchBattle {
  monster: IMonster;
  isWin: boolean;
  battleLogs: IBattleLog[];
  isLevelUp: boolean;
  dropList: IItem[];
  timestamp?: Date;
}
