import React from 'react';

import formClasses from '../forms.module.scss';

const ArticleForm = () => {
  return (
    <div className={`${formClasses['form']} ${formClasses['form--big']}`}>
      <h1 className={formClasses['form__title']}>Create new article</h1>
      <form className={formClasses['form__form']}>
        <label>
          <span className={formClasses['form__label']}>Title</span>
          <input className={formClasses['form__input']} type="text" name="title" id="title" placeholder="Title" />
        </label>

        <label>
          <span className={formClasses['form__label']}>Short description</span>
          <input
            className={formClasses['form__input']}
            type="text"
            name="descriptopn"
            id="descriptopn"
            placeholder="Title"
          />
        </label>

        <label>
          <span className={formClasses['form__label']}>Text</span>
          <textarea className={formClasses['form__input']} type="text" name="text" id="text" placeholder="Text" />
        </label>

        <div className={formClasses['form__label']}>Tags</div>
        <ul>
          <li className={formClasses['form__item']}>
            <input
              className={`${formClasses['form__input']} ${formClasses['form__input--small']}`}
              type="tag"
              name="tag"
              placeholder="Tag"
            />

            <button className={`${formClasses['form__btn-tag']} ${formClasses['form__btn-tag--delete']}`} type="button">
              Delete
            </button>
          </li>

          <li className={formClasses['form__item']}>
            <input
              className={`${formClasses['form__input']} ${formClasses['form__input--small']}`}
              type="tag"
              name="tag"
              placeholder="Tag"
            />

            <button className={`${formClasses['form__btn-tag']} ${formClasses['form__btn-tag--delete']}`} type="button">
              Delete
            </button>

            <button className={`${formClasses['form__btn-tag']} ${formClasses['form__btn-tag--add']}`} type="button">
              Add tag
            </button>
          </li>
        </ul>

        <button className={`${formClasses['form__btn']} ${formClasses['form__btn--small']}`} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
