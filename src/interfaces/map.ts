import { IMonster } from './monster';

export interface IMap {
  id: string;
  _id: string;
  containMonsters: IMonster[];
  desc: string;
  monsters: string[];
  name: string;
}
