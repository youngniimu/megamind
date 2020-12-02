import './forms.scss';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRequest } from '../../hooks/useRequest';
import { updatePlayerInfo, UpdatePlayerInfo } from '../../actions';

const SigninForm = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { doRequest: signin } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    data: { username, password },
    onSuccess(data: UpdatePlayerInfo['payload']) {
      dispatch(updatePlayerInfo(data));
    },
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    signin();
  };

  return (
    <>
      <div>
        <h3>SignIn</h3>
        <form onSubmit={(event) => onSubmit(event)}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-text-input"
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-text-input"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Signin</button>
        </form>
      </div>
    </>
  );
};

export { SigninForm };
