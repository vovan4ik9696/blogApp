import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import { fetchArticles } from '../../store/articlesSlice';
import ListItem from '../ListItem/ListItem';

import classes from './List.module.scss';
import './customPagination.css';

const List = () => {
  const articles = useSelector((state) => state.articlesState.articles);
  const { status, error } = useSelector((state) => state.articlesState);
  const articlesCount = useSelector((state) => state.articlesState.articlesCount);

  const [current, setCurrent] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const onPaginationCgange = (page) => {
    setCurrent(page);
    dispatch(fetchArticles(page));
  };

  const postsList = articles.length !== 0 ? articles.map((item) => <ListItem key={item.slug} post={item} />) : [];

  if (status === 'loading') {
    return <h1>LOADING...</h1>;
  }

  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }

  return (
    <section className={classes.list}>
      <ul className={classes['list__posts']}>{postsList}</ul>
      <Pagination
        total={articlesCount}
        current={current}
        defaultPageSize={20}
        showSizeChanger={false}
        onChange={onPaginationCgange}
      />
    </section>
  );
};

export default List;
