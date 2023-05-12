import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from '../Layout/Layout';
import List from '../List';
import Article from '../Article';
import SignUp from '../forms/SignUp';
import SignIn from '../forms/SignIn';
import EditProfile from '../forms/EditProfile';
import ArticleForm from '../forms/ArticleForm';
import './App.css';
import { setUserData } from '../../store/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = {
      image: null,
      token: null,
      email: null,
      username: null,
    };

    const initialize = () => {
      userData.token = localStorage.getItem('authToken');
      userData.username = localStorage.getItem('username');
      userData.image = localStorage.getItem('imageUrl');
      userData.email = localStorage.getItem('email');

      if (userData.token) {
        dispatch(setUserData(userData));
      }
    };
    initialize();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="articles/:slug/edit" element={<ArticleForm key="edit" />} />
          <Route path="new-article" element={<ArticleForm key="new" />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="*" element={<List />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
