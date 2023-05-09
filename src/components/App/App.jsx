import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout/Layout';
import List from '../List';
import Article from '../Article';
import SignUp from '../forms/SignUp';
import SignIn from '../forms/SignIn';
import EditProfile from '../forms/EditProfile';
import ArticleForm from '../forms/ArticleForm';

import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="art-form" element={<ArticleForm />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="*" element={<List />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
