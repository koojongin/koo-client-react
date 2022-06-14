import { API_SERVER_URL, DEFAULT_DISCORD_AVATAR_URL } from '../constants';

export const getItemURL = (_url = DEFAULT_DISCORD_AVATAR_URL) => {
  if (_url.indexOf('http') >= 0) {
    return _url;
  }
  const url = `${API_SERVER_URL}${_url}`;
  return url;
};

export const test = 1;
