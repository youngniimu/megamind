import './forms.scss';

import React from 'react';

const _SignupForm = (): JSX.Element => {
  const onSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <>
      <div>
        <h3>Signup for megamind</h3>
        <form onSubmit={(event) => onSubmit(event)}>
          <input
            className="form-text-input"
            type="text"
            placeholder="Username"
          />
          <input className="form-text-input" type="text" placeholder="Email" />
          <input
            className="form-text-input"
            type="password"
            placeholder="Password"
          />
          <input
            className="form-text-input"
            type="password"
            placeholder="Repeat password"
          />
        </form>
      </div>
    </>
  );
};

export const SignupForm = _SignupForm;
