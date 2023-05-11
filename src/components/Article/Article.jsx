import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'markdown-to-jsx';

import { fetchArticle } from '../../store/articlesSlice';
import heart from '../images/heart.svg';

import classes from './Article.module.scss';

const Article = () => {
  const article = useSelector((state) => state.articlesState.currentArticle);
  const { status, error } = useSelector((state) => state.articlesState);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArticle(slug));
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
  return (
    <article className={classes.article}>
      <div className={classes['article__header']}>
        <div className={classes['article__box']}>
          <h3 className={classes['article__title']}>{title}</h3>
          <img className={classes['article__heart']} src={heart} alt="icon" />
          <span className={classes['article__counter']}>{favoritesCount}</span>
        </div>
        <div className={classes['article__user']}>
          <div className={classes['article__details']}>
            <h3 className={classes['article__name']}>{username}</h3>
            <span className={classes['article__date']}>{formattedDate}</span>
          </div>
          <div className={classes['article__avatar']}>
            <img src={image} alt="avatar" />
          </div>
        </div>
      </div>
      <ul className={classes['article__tags']}>{tags}</ul>
      <p className={classes['article__description']}>{description}</p>

      {/* <h2 className={classes['article__text-title']}>Est Ampyciden pater patent</h2>
	
				<div className={classes['article__text']}>
					<h3>Amor saxa inpiger</h3>
					<p>
						Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad
						potest humum et.
					</p>
	
					<h3>Qua deos has fontibus</h3>
					<p>
						Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens,
						qua huius suo omnes ne pendentia citus pedum.
					</p>
	
					<h3>Quamvis pronuba</h3>
					<p>
						Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia
						Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram
						similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.
					</p>
				</div>
	
				<ol className={classes['article__list']}>
					<li>Clamoribus haesit tenentem iube Haec munera</li>
					<li>Vincla venae</li>
					<li>Paris includere etiam tamen</li>
					<li>Superi te putria imagine Deianira</li>
					<li>Tremore hoste Esse sed perstat capillis siqua</li>
				</ol> */}

      <Markdown>{body}</Markdown>
    </article>
  );
};

export default Article;
