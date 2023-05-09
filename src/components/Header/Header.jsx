import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes['header__logo']} to="/">
        Realworld Blog
      </Link>
      <div className={classes['header__authorization']}>
        <Link className={classes['header__sign-in']} to="/sign-in">
          Sign In
        </Link>
        <Link className={classes['header__sign-up']} to="/sign-up">
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
