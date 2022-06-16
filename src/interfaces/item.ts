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
  id: string;
  iType: string;
  name: string;
  gold: number;

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
  grade?: string;
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
