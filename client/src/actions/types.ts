import { ToggleDarkMode } from './darkMode';
import { UpdatePlayerInfo } from './playerInfo';

export enum ActionTypes {
  ToggleDarkMode,

  UpdatePlayerInfo,
  Signout,

  UpdateRoomInfo,
}

export interface Action {
  type: ActionTypes;
  payload: any;
}
