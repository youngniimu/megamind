import React from 'react';

import './toggleSwitch.scss';

import { useDarkMode } from '../../../hooks/useDarkMode';

interface ToggleButtonProps {
  name: string;
  style?: {
    right?: string;
    left?: string;
    bottomt?: string;
    top?: string;
  };
}

const ToggleSwitch = ({ name, style }: ToggleButtonProps): JSX.Element => {
  const { toggle, darkMode } = useDarkMode();

  // input gives only the on/off feature, no visible difference
  return (
    <>
      <label style={style} className="toggle-switch">
        <input onChange={toggle} type="checkbox" />
        <span className="slider"></span>
        <span className="slider-text"></span>
      </label>
    </>
  );
};

export { ToggleSwitch };
