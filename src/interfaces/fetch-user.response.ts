import { ICharacter } from './character';
import { IItem } from './item';
import { IStackedInventory } from './stacked-inventory';

export interface ResponseMe {
  calculatedCharacterData: any;
  character: ICharacter;
  nextExp: number;
  timestamp: string;
}

export interface ResponseInventory {
  character: ICharacter;
  items: IItem[];
  stackedInventory: IStackedInventory;
  timestamp: string;
}
