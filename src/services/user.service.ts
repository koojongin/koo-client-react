import authHeader from './auth.header';
import { API_SERVER_URL } from '../constants';
import axios from './axios.interceptor';
import {
  ResponseInventory,
  ResponseMe,
} from '../interfaces/fetch-user.response';
import { InventorySortType } from '../interfaces/types';
import { ResponseFetchBattle } from '../interfaces/fetch-battle.response';

interface EquipmentRequestBody {
  itemId: string;
  itemType: 'Weapon' | string;
}
interface UnequipmentRequestBody {
  itemId: string;
  itemType: 'Weapon' | string;
}
export const fetchMe = () => {
  return axios.get<never, ResponseMe>(`${API_SERVER_URL}/me`, {
    headers: authHeader(),
  });
};

export const fetchInventory = (_sort?: InventorySortType) => {
  const sort = _sort || 'createdAt';
  return axios.get<never, ResponseInventory>(`${API_SERVER_URL}/me/items`, {
    headers: authHeader(),
    params: {
      sort,
    },
  });
};

export const fetchEquipItem = (data: EquipmentRequestBody) => {
  return axios.post<never, ResponseFetchBattle>(
    `${API_SERVER_URL}/me/equip`,
    data,
    {
      method: 'post',
      headers: authHeader(),
    },
  );
};

export const fetchUnequipItem = (data: UnequipmentRequestBody) => {
  return axios.post<never, ResponseFetchBattle>(
    `${API_SERVER_URL}/me/unequip`,
    data,
    {
      method: 'post',
      headers: authHeader(),
    },
  );
};
