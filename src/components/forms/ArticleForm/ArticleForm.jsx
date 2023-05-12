import React, { useCallback, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchArticle, fetchNewArticle, fetchUpdateArticle } from '../../../store/articlesSlice';
import { resetStatus } from '../../../store/userSlice';
import formClasses from '../forms.module.scss';

const ArticleForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentArticle } = useSelector((state) => state.articlesState);
  const status = useSelector((state) => state.userState.status);
  const token = useSelector((state) => state.userState.userData.token);
  const { slug } = useParams();
  const isEditing = !!slug;

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchArticle(slug));
      reset(currentArticle);
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ mode: 'onBlur' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    data.tagList = data.tagList.map((tag) => tag.name);
    const { body, description, tagList, title } = data;
    if (isEditing) {
      dispatch(fetchUpdateArticle([slug, { article: { body, description, tagList, title } }, token]));
    } else {
      dispatch(fetchNewArticle([{ article: { body, description, tagList, title } }, token]));
    }
    reset();
    navigate('/');
  };

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
    if (status === 'registered') {
      navigate('/sign-in');
    }

    return () => {
      if (status === 'registered') {
        dispatch(resetStatus());
      }
    };
  }, [status, navigate, dispatch]);

  useEffect(() => {
    append({ name: '' });
  }, [append]);

  return (
    <div className={`${formClasses['form']} ${formClasses['form--big']}`}>
      <h1 className={formClasses['form__title']}>{isEditing ? 'Edit article' : 'Create new article'}</h1>
      <form className={formClasses['form__form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Title</span>
          <input
            {...register('title', {
              required: 'Введите название статьи',
            })}
            className={`${formClasses['form__input']} ${errors?.title ? formClasses['form__input--invalid'] : ''}`}
            type="text"
            placeholder="Title"
          />
          {showError('title')}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Short description</span>
          <input
            {...register('description', {
              required: 'Введите описание статьи',
            })}
            className={`${formClasses['form__input']} ${
              errors?.description ? formClasses['form__input--invalid'] : ''
            }`}
            type="text"
            placeholder="Title"
          />
          {showError('description')}
        </label>

        <label className={formClasses['form__input-wrapper']}>
          <span className={formClasses['form__label']}>Text</span>
          <textarea
            {...register('body', {
              required: 'Введите текст статьи',
            })}
            className={`${formClasses['form__input']} ${errors?.body ? formClasses['form__input--invalid'] : ''}`}
            type="text"
            placeholder="Text"
          />
          {showError('body')}
        </label>

        <div className={formClasses['form__label']}>Tags</div>
        <ul>
          {fields.map((field, index) => (
            <li key={index} className={formClasses['form__item']}>
              <Controller
                name={`tagList[${index}].name`}
                control={control}
                defaultValue={isEditing ? currentArticle.tagList[index] : field.name}
                rules={{ required: 'Поле не может быть пустым' }}
                render={({ field }) => (
                  <input {...field} className={`${formClasses['form__input']} ${formClasses['form__input--small']}`} />
                )}
              />
              {fields.length === 1 ? null : (
                <button
                  className={`${formClasses['form__btn-tag']} ${formClasses['form__btn-tag--delete']}`}
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              )}

              {errors.tagList && errors.tagList[index]?.name && (
                <p className={formClasses['form__error']}>{errors.tagList[index].name.message}</p>
              )}

              {fields.length - 1 === index && (
                <button
                  className={`${formClasses['form__btn-tag']} ${formClasses['form__btn-tag--add']}`}
                  onClick={() => append({ name: '' })}
                  type="button"
                >
                  Add tag
                </button>
              )}
            </li>
          ))}
        </ul>

        <button className={`${formClasses['form__btn']} ${formClasses['form__btn--small']}`} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
