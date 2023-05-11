import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { clearError, fetchUserData, resetStatus } from '../../../store/userSlice';
import formClasses from '../forms.module.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.userState.error);
  const status = useSelector((state) => state.userState.status);
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    const { username, email, pass: password } = data;
    dispatch(fetchUserData({ user: { username, email, password } }));
    reset();
  };

  const showError = useCallback(
    (inputName) => {
      if (error && error[inputName]) {
        dispatch(clearError());
        alert(`${inputName} уже зарегестрирован`);
      }
      if (errors?.[inputName]) {
        return <p className={formClasses['form__error']}>{errors?.[inputName]?.message}</p>;
      }

      return;
    },
    [error, errors]
  );

  useEffect(() => {
    if (status === 'registered') {
      navigate('/sign-in');
    }

    return () => {
      if (status === 'registered') {
        dispatch(resetStatus());
      }
    };
  }, [status, navigate, dispatch]);

  return (
    <div className={formClasses['form']}>
      <h1 className={formClasses['form__title']}>Create new account</h1>
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
            className={`${formClasses['form__input']} ${errors?.username ? formClasses['form__input--invalid'] : ''}`}
            placeholder="Username"
          />
          {showError('username')}
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
            className={`${formClasses['form__input']} ${errors?.email ? formClasses['form__input--invalid'] : ''}`}
            type="email"
            placeholder="Email address"
          />
          {showError('email')}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Password</span>
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
            className={`${formClasses['form__input']} ${errors?.pass ? formClasses['form__input--invalid'] : ''}`}
            type="password"
            placeholder="Password"
          />
          {errors?.pass && <p className={formClasses['form__error']}>{errors?.pass?.message}</p>}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Repeat Password</span>
          <input
            {...register('rep-pass', {
              required: 'Введите пароль повторно.',
              validate: (val) => {
                if (watch('pass') != val) {
                  return 'Пароли не совпадают.';
                }
              },
            })}
            className={`${formClasses['form__input']} ${
              errors?.['rep-pass'] ? formClasses['form__input--invalid'] : ''
            }`}
            type="password"
            placeholder="Password"
          />
          {errors?.['rep-pass'] && <p className={formClasses['form__error']}>{errors?.['rep-pass']?.message}</p>}
        </label>

        <input
          {...register('agree', {
            required: true,
          })}
          className={formClasses['form__checkbox']}
          type="checkbox"
          id="agree"
        />
        <label className={`${errors?.agree ? formClasses['form__checkbox--invalid'] : ''}`} htmlFor="agree">
          I agree to the processing of my personal information
        </label>

        <button className={formClasses['form__btn']} type="submit">
          Create
        </button>
      </form>
      <div className={formClasses['form__question']}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </div>
    </div>
  );
};

export default SignUp;
