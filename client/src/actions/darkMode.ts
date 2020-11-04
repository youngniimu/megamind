import { ActionTypes } from './types';

export interface ToggleDarkMode {
  type: ActionTypes.ToggleDarkMode;
}

export const toggleDarkMode = (): ToggleDarkMode => {
  return {
    type: ActionTypes.ToggleDarkMode,
  };
};
