export interface IMonster {
  id: string;
  _id: string;
  armorOfFire: number;
  armorOfIce: number;
  armorOfLightning: number;
  armorOfPhysical: number;
  createdAt: string;
  damageOfChaos: number;
  damageOfFire: number;
  damageOfIce: number;
  damageOfLightning: number;
  damageOfPhysical: number;
  dropList: [];
  evasion: number;
  exp: number;
  gold: number;
  grade: number;

  level: number;
  maxHP: number;
  maxMP: number;
  name: string;
  resistanceOfChaos: number;
  resistanceOfFire: number;
  resistanceOfIce: number;
  resistanceOfLightning: number;
  resistanceOfPhysical: number;
  thumbnail: string;

  __v: any;
  group: string;
}
