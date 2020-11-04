import './css/app.css';

import React from 'react';

import { Landing } from './Landing';
import { useDarkMode } from '../hooks/useDarkMode';

const _App = (): JSX.Element => {
  const { toggle } = useDarkMode();

  return (
    <div>
      <button onClick={toggle}>darkMode</button>
      <Landing />
    </div>
  );
};

export const App = _App;
