import React from 'react';

import formClasses from '../forms.module.scss';

const SignIn = () => {
  return (
    <div className={formClasses['form']}>
      <h1 className={formClasses['form__title']}>Sign In</h1>
      <form className={formClasses['form__form']}>
        <label>
          <span className={formClasses['form__label']}>Email address</span>
          <input className={formClasses['form__input']} type="email" name="email" placeholder="Email address" />
        </label>

        <label>
          <span className={formClasses['form__label']}>Password</span>
          <input className={formClasses['form__input']} type="password" name="pass" placeholder="Password" />
        </label>

        <button className={formClasses['form__btn']} type="submit">
          Login
        </button>
      </form>
      <div className={formClasses['form__question']}>
        Already have an account? <a href="#">Sign Up.</a>
      </div>
    </div>
  );
};

export default SignIn;
