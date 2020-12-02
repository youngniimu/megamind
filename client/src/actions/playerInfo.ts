import { Action, ActionTypes } from './types';

export interface UpdatePlayerInfo {
  type: ActionTypes.UpdatePlayerInfo;
  payload: {
    username: string;
    color: string;
    gamesPlayed: number;
    gamesWon: number;
  };
}

export interface SignoutAction {
  type: ActionTypes.Signout;
  payload: {};
}

export const updatePlayerInfo = (payload: UpdatePlayerInfo['payload']) => {
  return {
    type: ActionTypes.UpdatePlayerInfo,
    payload,
  };
};

export const signoutAction = (payload: {}) => {
  return {
    type: ActionTypes.Signout,
  };
};
