import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setUserData } from '../../store/userSlice';

import classes from './Header.module.scss';

const Header = () => {
  const isAuth = useSelector((state) => !!state.userState.userData.token);

  return (
    <header className={classes.header}>
      <Link className={classes['header__logo']} to="/">
        Realworld Blog
      </Link>
      <div className={classes['header__authorization']}>{isAuth ? <IsAuthHeader /> : <NonAuthHeader />}</div>
    </header>
  );
};

export default Header;

const NonAuthHeader = () => {
  return (
    <>
      <Link className={classes['header__sign-in']} to="/sign-in">
        Sign In
      </Link>
      <Link className={classes['header__sign-up']} to="/sign-up">
        Sign Up
      </Link>
    </>
  );
};

const IsAuthHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, imageUrl } = useSelector((state) => state.userState.userData);

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('imageUrl');
    localStorage.removeItem('email');

    dispatch(
      setUserData({
        image: null,
        token: null,
        email: null,
        username: null,
      })
    );
    navigate('/');
  };
  return (
    <>
      <Link className={classes['header__create']} to="/new-article">
        Create article
      </Link>
      <Link className={classes['header__profile']} to="/profile">
        <p>{username}</p>
        <div className={classes['header__image']}>
          <img src={imageUrl} alt="avatar" />
        </div>
      </Link>
      <a className={classes['header__log-out']} onClick={handleLogOut}>
        Log Out
      </a>
    </>
  );
};
