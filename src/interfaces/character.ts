import { IItem } from './item';

export interface IUser {
  avatar: string;
  createdAt: string;
  id: string;
  nickname: string;
  userId: string;
  username: string;
}
export interface ICharacter {
  id: string;
  _id: string;
  armor: number;
  criticalChanceScore: number;
  criticalMultiplier: number;
  damageOfChaos: number;
  damageOfFire: number;
  damageOfIce: number;
  damageOfLightning: number;
  damageOfPhysical: number;
  equipedWeapon: IItem;
  equipedWeaponId: string;
  evasion: number;
  exp: number;
  gold: number;

  lastBattledAt: string;
  level: number;
  refreshToken: string;
  skillTree: any;
  skillTreeId: string;
  stackedInventoryId: string;
  token: string;
  tokenExpiredAt: string;
  user: IUser;
  userId: string;

  calculatedCharacterData?: any;

  ///
  test: any;
  __v: number;
}
