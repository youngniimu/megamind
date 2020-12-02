import { ActionTypes, Action, UpdateRoomInfo } from '../actions';
import { StoreState } from './index';

export const roomInfoReducer = (
  state: null | UpdateRoomInfo['payload'] = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UpdateRoomInfo:
      return action.payload;
    case ActionTypes.Signout:
      return null;
    default:
      return state;
  }
};
