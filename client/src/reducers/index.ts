import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';
import { playerInfoReducer } from './playerInfoReducer';
import { UpdatePlayerInfo } from '../actions/';
import { roomInfoReducer } from './roomInforReducer';
import { UpdateRoomInfo } from '../actions';

export interface StoreState {
  darkMode: boolean;
  playerInfo: UpdatePlayerInfo['payload'] | null;
  roomInfo: UpdateRoomInfo['payload'] | null;
}

export const reducers = combineReducers<StoreState>({
  darkMode: darkModeReducer,
  playerInfo: playerInfoReducer,
  roomInfo: roomInfoReducer,
});
