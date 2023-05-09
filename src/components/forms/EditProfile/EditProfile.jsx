import React from 'react';

import formClasses from '../forms.module.scss';

const EditProfile = () => {
  return (
    <div className={formClasses['form']}>
      <h1 className={formClasses['form__title']}>Edit Profile</h1>
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
          <span className={formClasses['form__label']}>New password</span>
          <input
            className={formClasses['form__input']}
            type="password"
            name="new-pass"
            id="new-pass"
            placeholder="New password"
          />
        </label>

        <label>
          <span className={formClasses['form__label']}>Avatar image (url)</span>
          <input
            className={formClasses['form__input']}
            type="text"
            name="avatar-url"
            id="avatar-url"
            placeholder="Avatar image"
          />
        </label>

        <button className={formClasses['form__btn']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
