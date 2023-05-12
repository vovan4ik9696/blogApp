import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BlogApiService from '../service/blogApiService';

const blogApiService = new BlogApiService();

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function ([page = 1, token = null], { rejectWithValue }) {
    try {
      return await blogApiService.getArticles(page, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async function ([slug, token = null], { rejectWithValue }) {
    try {
      return await blogApiService.getArticle(slug, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewArticle = createAsyncThunk(
  'articles/fetchNewArticle',
  async function ([articleData, token], { rejectWithValue }) {
    try {
      return await blogApiService.postCreateArticle(articleData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpdateArticle = createAsyncThunk(
  'articles/fetchUpdateArticle',
  async function ([slug, articleData, token], { rejectWithValue }) {
    try {
      return await blogApiService.updateArticle(slug, articleData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchUpdateArticle',
  async function ([slug, token], { rejectWithValue }) {
    try {
      return await blogApiService.deleteArticle(slug, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavoriteArticle = createAsyncThunk(
  'articles/fetchFavoriteArticle',
  async function ([slug, token, doing], { rejectWithValue, dispatch }) {
    try {
      const response = await blogApiService.favoriteArticle(slug, token, doing);
      dispatch(setUpdatedArticle(response.data.article));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    currentArticle: null,
    status: null,
    error: null,
  },
  reducers: {
    setUpdatedArticle(state, action) {
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          article.favorited = action.payload.favorited;
          article.favoritesCount = action.payload.favoritesCount;
        }
        return article;
      });
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      const { articles, articlesCount } = action.payload;

      state.articles = articles;
      state.articlesCount = articlesCount;
      state.status = 'resolved';
    },
    [fetchArticle.fulfilled]: (state, action) => {
      const { article } = action.payload;
      state.currentArticle = article;
      state.status = 'resolved';
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { setUpdatedArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
