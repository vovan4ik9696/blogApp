import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserUpdate } from '../../../store/userSlice';
import formClasses from '../forms.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { token, username, email, imageUrl } = useSelector((state) => state.userState.userData);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur', defaultValues: { username, email, image: imageUrl } });

  const onSubmit = (data) => {
    const { email, pass: password, username, image } = data;
    dispatch(fetchUserUpdate([{ user: { email, password, username, image } }, token]));

    reset();
  };

  const showError = useCallback(
    (inputName) => {
      if (errors?.[inputName]) {
        return <p className={formClasses['form__error']}>{errors?.[inputName]?.message}</p>;
      }

      return;
    },
    [errors]
  );

  return (
    <div className={formClasses['form']}>
      <h1 className={formClasses['form__title']}>Edit Profile</h1>
      <form className={formClasses['form__form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Username</span>
          <input
            {...register('username', {
              required: 'Введите имя пользователя.',
              minLength: {
                value: 3,
                message: 'Имя пользователя должно быть больше 3 символов.',
              },
              maxLength: {
                value: 20,
                message: 'Имя пользователя должно быть не больше 20 символов',
              },
            })}
            className={formClasses['form__input']}
            type="text"
            placeholder="Username"
          />
          {showError()}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Email address</span>
          <input
            {...register('email', {
              required: 'Введите свой e-mail.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: 'Введите корректный e-mail.',
              },
            })}
            className={formClasses['form__input']}
            type="email"
            placeholder="Email address"
          />
          {showError()}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>New password</span>
          <input
            {...register('pass', {
              required: 'Введите пароль.',
              minLength: {
                value: 6,
                message: 'Пароль должен быть больше 6 символов.',
              },
              maxLength: {
                value: 40,
                message: 'Пароль должен быть не больше 40 символов',
              },
            })}
            className={formClasses['form__input']}
            type="password"
            placeholder="New password"
          />
          {showError()}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Avatar image (url)</span>
          <input {...register('image')} className={formClasses['form__input']} type="text" placeholder="Avatar image" />
        </label>

        <button className={formClasses['form__btn']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
