import authHeader from './auth.header';
import { API_SERVER_URL } from '../constants';
import { ResponseFetchBattle } from '../interfaces/fetch-battle.response';
import axios from './axios.interceptor';
import { IMap } from '../interfaces/map';

export const fetchMaps = () => {
  return axios.get<never, { gameMaps: IMap[] }>(
    `${API_SERVER_URL}/getGameMapList`,
    {
      headers: authHeader(),
    },
  );
};
export const fetchBattle = (data: any) => {
  return axios.post<never, ResponseFetchBattle>(
    `${API_SERVER_URL}/me/battle`,
    data,
    {
      method: 'post',
      headers: authHeader(),
    },
  );
};
