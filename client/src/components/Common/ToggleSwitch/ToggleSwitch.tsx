import React from 'react';

import './toggleSwitch.scss';

interface ToggleButtonProps {
  name: string;
  toggle(): void;
  style?: {
    right?: string;
    left?: string;
    bottomt?: string;
    top?: string;
  };
}

const ToggleSwitch = ({
  name,
  style,
  toggle,
}: ToggleButtonProps): JSX.Element => {
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
