import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './articlesSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    articlesState: articleReducer,
    userState: userSlice,
  },
});
