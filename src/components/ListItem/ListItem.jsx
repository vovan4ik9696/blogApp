import React from 'react';
import { Link } from 'react-router-dom';

import heart from '../images/heart.svg';
import classes from '../List/List.module.scss';

const ListItem = ({
  post: {
    title,
    favoritesCount,
    author: { username, image },
    createdAt,
    tagList,
    description,
    slug,
  },
}) => {
  const tags = tagList.map((tag, index) => {
    if (tag.length !== 0) {
      return (
        <li key={index} className={classes['list__tag']}>
          {tag}
        </li>
      );
    }
  });

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function sanitizeImageUrl(imageUrl) {
    const url = new URL(imageUrl, 'http://dummyurl.com');
    if (url.protocol === 'javascript:') {
      return '';
    }
    return imageUrl;
  }

  const sanitizedImage = sanitizeImageUrl(image);

  return (
    <li className={classes['list__post']}>
      <div className={classes['list__header']}>
        <div className={classes['list__box']}>
          <Link to={`articles/${slug}`} className={classes['list__title']}>
            {title}
          </Link>
          <img className={classes['list__heart']} src={heart} alt="icon" />
          <span className={classes['list__counter']}>{favoritesCount}</span>
        </div>
        <div className={classes['list__user']}>
          <div className={classes['list__details']}>
            <h3 className={classes['list__name']}>{username}</h3>
            <span className={classes['list__date']}>{formattedDate}</span>
          </div>
          <div className={classes['list__avatar']}>
            <img src={sanitizedImage} alt="avatar" />
          </div>
        </div>
      </div>
      <ul className={classes['list__tags']}>{tags}</ul>
      <p className={classes['list__text']}>{description}</p>
    </li>
  );
};

export default ListItem;
