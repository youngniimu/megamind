import { ActionTypes, Action, UpdatePlayerInfo } from '../actions';
import { StoreState } from './index';

export const playerInfoReducer = (
  state: null | UpdatePlayerInfo['payload'] = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UpdatePlayerInfo:
      return action.payload;
    case ActionTypes.Signout:
      return null;
    default:
      return state;
  }
};
