export const API_SERVER_URL = 'http://jiku90.com';
export const SOCKET_SERVER_HOST = 'jiku90.com';
export const SOCKET_SERVER_URI = `ws://${SOCKET_SERVER_HOST}:3001/global-chat`;
export const BATTLE_COOLTIME = 1000 * 4;
export const DISCORD_AVATAR_URL = 'https://cdn.discordapp.com/avatars/';
export const DEFAULT_DISCORD_AVATAR_URL =
  'https://cdn.discordapp.com/embed/avatars/0.png';
export const ITEM_GRADES = ['NORMAL', 'MAGIC', 'RARE'];
export const SOCKET_EVENT = {
  CLIENT_MESSAGE: 'client:message',
  CLIENT_LOGIN: 'client:login',
  ON_CONNECTED: 'client:connect',
  ON_SERVER_UPDATE: 'update:version',
  REFRESH_CONNECTED_USER: 'refresh:connectedUser',
  ON_SHARE_ITEM_LINK: 'client:shareItemLink',
};
