import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';

export interface StoreState {
  darkMode: boolean;
}

export const reducers = combineReducers<StoreState>({
  darkMode: darkModeReducer,
});
