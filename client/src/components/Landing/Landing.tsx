import './landing.scss';

import React from 'react';

import { ToggleSwitch } from '../Common/ToggleSwitch/ToggleSwitch';
import { Link } from '../Nav/Link';
import { Modal, useModal } from '../Common/Modal/Modal';
import { SignupForm } from '../Forms/SignupForm';

import { useDarkMode } from '../../hooks/useDarkMode';

export const Landing = (): JSX.Element => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <ToggleSwitch style={{ right: '10px' }} name="darkMode" />
      <div className="landing-choose-game">
        <Link className="landing-choose-game-button" href="/singleplayer/lobby">
          Single player
        </Link>
        <Link className="landing-choose-game-button" href="/multiplayer/lobby">
          Play Online
        </Link>
      </div>
      <div className="landing-footer">
        <div className="landing-footer-button">About</div>
        <div className="landing-footer-button">
          Add to
          <br />
          homescreen
        </div>
      </div>
      <button onClick={toggle}>modal</button>
      <Modal isShowing={isShowing} hide={toggle}>
        <SignupForm />
      </Modal>
    </>
  );
};
