import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BlogApiService from '../service/blogApiService';

const blogApiService = new BlogApiService();

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async function (page = 1, { rejectWithValue }) {
  try {
    return await blogApiService.getArticles(page);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async function (slug, { rejectWithValue }) {
  try {
    return await blogApiService.getArticle(slug);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: 0,
    currentArticle: null,
    status: null,
    error: null,
  },
  reducers: {},
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

export default articlesSlice.reducer;
