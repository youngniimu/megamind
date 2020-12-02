import './forms.scss';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { ColorPicker } from './ColorPicker/ColorPicker';
import { useRequest } from '../../hooks/useRequest';
import { updatePlayerInfo, UpdatePlayerInfo } from '../../actions/playerInfo';

const _SignupForm = (): JSX.Element => {
  const [successText, setSuccessText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [color, setColor] = useState('');
  const dispatch = useDispatch();
  const passwordCheck = useRef<
    | {}
    | {
        backgroundColor: string;
        borderColor: string;
      }
  >({});
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    data: { username, password, color },
    onSuccess(data: UpdatePlayerInfo['payload']) {
      console.log('dispatch update userinfo');
      dispatch(updatePlayerInfo(data));
      setSuccessText('User Created Successfully!');
    },
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    doRequest();
  };

  passwordCheck.current =
    password === '' && repeatPassword === ''
      ? {}
      : password !== repeatPassword
      ? { border: '2px solid red', backgroundColor: 'salmon' }
      : { border: '2px solid green', backgroundColor: 'lightgreen' };

  return (
    <>
      <div>
        <h3>Signup for megamind</h3>
        <form onSubmit={(event) => onSubmit(event)}>
          <input
            autoComplete="nope"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-text-input"
            type="text"
            placeholder="Username"
            maxLength={8}
          />
          <input
            value={password}
            style={passwordCheck.current}
            onChange={(e) => setPassword(e.target.value)}
            className="form-text-input"
            type="password"
            placeholder="Password"
            maxLength={12}
          />
          <input
            style={passwordCheck.current}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="form-text-input"
            type="password"
            placeholder="Repeat password"
            maxLength={12}
          />
          <div>
            <h3>Select a color</h3>
            <div>
              <ColorPicker color={color} setColor={setColor} />
              <span
                className="signup-color"
                style={{
                  backgroundColor: color,
                  textAlign: 'center',
                  padding: '1em',
                  borderRadius: '1em',
                }}
              >
                {username}
              </span>
            </div>
          </div>
          <button type="submit">SignUP!</button>
        </form>
        {successText ? <div className="success-text">{successText}</div> : null}
      </div>
    </>
  );
};

export const SignupForm = _SignupForm;
