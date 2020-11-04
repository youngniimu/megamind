import './app.css';

import React from 'react';

import { Route } from './Nav/Route';
import { Landing } from './Landing/Landing';
import { SinglePlayerLobby } from './SinglePlayer/SinglePlayerLobby';
import { SinglePlayerGame } from './SinglePlayer/SinglePlayerGame';
import { MultiPlayerLobby } from './Multiplayer/MultiPlayerLobby';

const _App = (): JSX.Element => {
  return (
    <>
      <Route path="/">
        <Landing />
      </Route>
      <Route path="/singleplayer/lobby">
        <SinglePlayerLobby />
      </Route>
      <Route path="/singleplayer/game">
        <SinglePlayerGame />
      </Route>
      <Route path="/multiplayer/game">
        <MultiPlayerLobby />
      </Route>
    </>
  );
};

export const App = _App;
