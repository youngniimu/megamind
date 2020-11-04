import { ActionTypes, Action } from '../actions';
import { StoreState } from './index';

export const darkModeReducer = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case ActionTypes.ToggleDarkMode:
      return !state;
    default:
      return state;
  }
};
