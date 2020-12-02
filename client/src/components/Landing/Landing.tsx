import './landing.scss';

import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, useModal } from '../Common/Modal/Modal';
import { ToggleSwitch } from '../Common/ToggleSwitch/ToggleSwitch';
import { Link } from '../Nav/Link';
import { SignupForm } from '../Forms/SignupForm';
import { SigninForm } from '../Forms/SigninForm';
import { UserInfo } from '../Forms/UserInfo';

import { StoreState } from '../../reducers';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useRequest } from '../../hooks/useRequest';

import { signoutAction, SignoutAction } from '../../actions/';

export const Landing = (): JSX.Element => {
  const { isShowing, toggleModal } = useModal();
  const { toggleDark } = useDarkMode();
  const modalSelector = useRef('');
  const playerInfo = useSelector((state: StoreState) => state.playerInfo);
  const dispatch = useDispatch();
  const { doRequest: signout } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    data: {},
    onSuccess(data: SignoutAction['payload']) {
      dispatch(signoutAction(data));
    },
  });

  const modalHelper = (label: string) => {
    modalSelector.current = label;
    toggleModal();
  };

  const links = [
    !playerInfo && { label: 'signin' },
    !playerInfo && { label: 'signup' },
    playerInfo && { label: playerInfo.username },
    playerInfo && { label: 'signout' },
  ]
    .filter((linkConfig) => linkConfig)
    // @ts-ignore
    .map(({ label }: JSX.Element) => {
      return (
        <div
          className="landing-user-item"
          key={label}
          onClick={
            label === 'signout'
              ? () => signout()
              : !playerInfo
              ? () => modalHelper(label)
              : undefined
          }
        >
          {label}
        </div>
      );
    });

  return (
    <>
      <div className="landing-user-actions">{links}</div>
      <ToggleSwitch
        toggle={toggleDark}
        style={{ right: '10px' }}
        name="darkMode"
      />
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
      <Modal isShowing={isShowing} hide={toggleModal}>
        {modalSelector.current === 'user' ? (
          <UserInfo />
        ) : modalSelector.current === 'signup' ? (
          <SignupForm />
        ) : (
          <SigninForm />
        )}
      </Modal>
    </>
  );
};
