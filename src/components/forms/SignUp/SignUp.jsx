import React from 'react';

import formClasses from '../forms.module.scss';

// import formClasses from './SignUp.module.scss';
const SignUp = () => {
  return (
    <div className={formClasses['form']}>
      <h1 className={formClasses['form__title']}>Create new account</h1>
      <form className={formClasses['form__form']}>
        <label>
          <span className={formClasses['form__label']}>Username</span>
          <input className={formClasses['form__input']} type="text" name="username" placeholder="Username" />
        </label>

        <label>
          <span className={formClasses['form__label']}>Email address</span>
          <input className={formClasses['form__input']} type="email" name="email" placeholder="Email address" />
        </label>

        <label>
          <span className={formClasses['form__label']}>Password</span>
          <input className={formClasses['form__input']} type="password" name="pass" placeholder="Password" />
        </label>

        <label>
          <span className={formClasses['form__label']}>Repeat Password</span>
          <input
            className={formClasses['form__input']}
            type="password"
            name="rep-pass"
            id="rep-pass"
            placeholder="Password"
          />
        </label>

        <input className={formClasses['form__checkbox']} type="checkbox" name="agree" id="agree" />
        <label htmlFor="agree">I agree to the processing of my personal information</label>

        <button className={formClasses['form__btn']} type="submit">
          Create
        </button>
      </form>
      <div className={formClasses['form__question']}>
        Already have an account? <a href="#">Sign In.</a>
      </div>
    </div>
  );
};

export default SignUp;
