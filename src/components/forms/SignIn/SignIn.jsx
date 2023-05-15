import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { fetchUserLog, resetStatus } from '../../../store/userSlice';
import formClasses from '../forms.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.userState.status);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const showError = useCallback(
    (inputName) => {
      if (errors?.[inputName]) {
        return <p className={formClasses['form__error']}>{errors?.[inputName]?.message}</p>;
      }

      return;
    },
    [errors]
  );

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(resetStatus());
      alert('Неверный email или пароль');
    }
  }, [status]);

  useEffect(() => {
    if (status === 'logined') {
      navigate('/');
    }

    return () => {
      if (status === 'logined') {
        dispatch(resetStatus());
      }
    };
  }, [status, navigate, dispatch]);

  const onSubmit = (data) => {
    const { email, pass: password } = data;
    dispatch(fetchUserLog({ user: { email, password } }));
    reset();
  };

  return (
    <div className={formClasses['form']}>
      <h1 className={formClasses['form__title']}>Sign In</h1>
      <form className={formClasses['form__form']} onSubmit={handleSubmit(onSubmit)}>
        <label>
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
          {showError('email')}
        </label>

        <label>
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
            className={formClasses['form__input']}
            type="password"
            placeholder="Password"
          />
          {showError('pass')}
        </label>

        <button className={formClasses['form__btn']} type="submit">
          Login
        </button>
      </form>
      <div className={formClasses['form__question']}>
        Already have an account? <Link to={'/sign-up'}>Sign Up.</Link>
      </div>
    </div>
  );
};

export default SignIn;
