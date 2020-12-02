import { ActionTypes } from './types';

export interface UpdateRoomInfo {
  type: ActionTypes.UpdateRoomInfo;
  payload: {
    roomName: string;
    roomId: string;
    players: [];
  };
}

export const updateRoomInfo = (payload: UpdateRoomInfo['payload']) => {
  return {
    type: ActionTypes.UpdateRoomInfo,
    payload: payload,
  };
};
