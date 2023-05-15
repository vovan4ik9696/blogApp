import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm, message } from 'antd';
import Markdown from 'markdown-to-jsx';

import { fetchArticle, fetchDeleteArticle, fetchFavoriteArticle } from '../../store/articlesSlice';
import heart from '../images/heart.svg';
import heartRed from '../images/heart-red.svg';

import classes from './Article.module.scss';

const Article = () => {
  const article = useSelector((state) => state.articlesState.currentArticle);
  const { status, error } = useSelector((state) => state.articlesState);
  const { username: profileName, token } = useSelector((state) => state.userState.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArticle([slug, token]));
  }, []);

  if (!article || status === 'loading') {
    return <h1>LOADING...</h1>;
  }

  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }

  const {
    title,
    favoritesCount,
    author: { username, image },
    createdAt,
    tagList,
    description,
    body,
    favorited,
  } = article;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tags = tagList.map((tag, index) => {
    if (tag.length !== 0) {
      return (
        <li key={index} className={classes['article__tag']}>
          {tag}
        </li>
      );
    }
  });

  const deleteArticle = (slug, token) => {
    dispatch(fetchDeleteArticle([slug, token]));
    message.success('Success');
    navigate('/');
  };

  const handleLike = () => {
    !!token && dispatch(fetchFavoriteArticle([slug, token, favorited]));
  };

  const btnsControl = username === profileName && (
    <div className={classes['article__controls']}>
      <Popconfirm
        className={`${classes['article__controls-btn']} ${classes['article__controls-btn--delete']}`}
        title="Delete the article"
        description="Are you sure to delete this article?"
        onConfirm={() => deleteArticle(slug, token)}
        okText="Yes"
        cancelText="No"
      >
        <span>Delete</span>
      </Popconfirm>

      <Link
        className={`${classes['article__controls-btn']} ${classes['article__controls-btn--edit']}`}
        to={`/articles/${slug}/edit`}
      >
        Edit
      </Link>
    </div>
  );
  return (
    <article className={classes.article}>
      <div className={classes['article__content']}>
        <div className={classes['article__header']}>
          <h3 className={classes['article__title']}>{title}</h3>
          {token ? (
            !favorited ? (
              <img className={classes['article__heart']} src={heart} alt="heart" onClick={handleLike} />
            ) : (
              <img className={classes['article__heart']} src={heartRed} alt="red heart" onClick={handleLike} />
            )
          ) : (
            <img className={classes['article__heart']} src={heart} alt="heart" onClick={handleLike} />
          )}
          <span className={classes['article__counter']}>{favoritesCount}</span>
        </div>

        <ul className={classes['article__tags']}>{tags}</ul>
        <p className={classes['article__description']}>{description}</p>

        <Markdown>{body}</Markdown>
      </div>

      <div className={classes['article__user']}>
        <div className={classes['article__inner']}>
          <div className={classes['article__details']}>
            <h3 className={classes['article__name']}>{username}</h3>
            <span className={classes['article__date']}>{formattedDate}</span>
          </div>
          <div className={classes['article__avatar']}>
            <img src={image} alt="avatar" />
          </div>
        </div>
        {btnsControl}
      </div>
    </article>
  );
};

export default Article;
