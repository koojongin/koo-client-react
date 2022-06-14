interface ItemMode {
  damageOfLightningPercent: number;
  desc: string;
  name: string;
  nameKr: string;
  range: number[];
  tier: number;
  value?: number;
}
export interface IItem {
  name?: string;

  armor?: number;
  createdAt?: string;
  criticalMultiplier?: number;
  criticalScore?: number;
  damageOfChaos?: number;
  damageOfFire?: number;
  damageOfIce?: number;
  damageOfLightning?: number;
  damageOfPhysical?: number;
  description?: string;
  evasion?: number;
  gold?: number;
  grade?: string;
  iType?: string;
  id?: string;
  isInAuction?: boolean;
  isInInventory?: boolean;
  isOrigin?: boolean;
  isStackable?: boolean;
  level?: number;
  mods?: ItemMode[];
  originId?: string;
  reqLevel?: number;
  stacked?: number;
  starforce?: number;
  starforceLimit?: number;
  thumbnail?: string;
  userId?: string;
  originItem?: IItem;
  [x: string]: any;
}
