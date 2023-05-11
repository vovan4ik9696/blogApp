import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BlogApiService from '../service/blogApiService';

const blogApiService = new BlogApiService();

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userData, { rejectWithValue }) => {
  try {
    await blogApiService.newUser(userData);
  } catch (error) {
    const errorInfo = {
      message: error.message,
      status: error.response.status,
      data: error.response?.data,
    };
    return rejectWithValue(errorInfo);
  }
});

export const fetchUserLog = createAsyncThunk('user/fetchUserLog', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const response = await blogApiService.postUserData(userData);
    dispatch(addUser(response.user));
    localStorage.setItem('authToken', response.user.token);
    localStorage.setItem('username', response.user.username);
    localStorage.setItem('imageUrl', response.user.image);
    localStorage.setItem('email', response.user.email);
  } catch (error) {
    const errorInfo = {
      message: error.message,
      status: error.response.status,
      data: error.response?.data,
    };
    return rejectWithValue(errorInfo);
  }
});

export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async ([userData, token], { rejectWithValue, dispatch }) => {
    try {
      console.log('123123123');
      console.log(userData, token);
      const response = await blogApiService.updateUserDate(userData, token);
      dispatch(addUser(response.user));
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('imageUrl', response.user.image);
      localStorage.setItem('email', response.user.email);
    } catch (error) {
      const errorInfo = {
        message: error.message,
        status: error.response.status,
        data: error.response?.data,
      };
      return rejectWithValue(errorInfo);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      username: null,
      email: null,
      imageUrl: null,
      token: null,
    },
    error: null,
    status: null,
  },
  reducers: {
    addUser(state, action) {
      state.userData.token = action.payload.token;
      state.userData.email = action.payload.email;
      state.userData.username = action.payload.username;
      state.userData.imageUrl = action.payload.image;
    },
    clearError(state) {
      state.error = null;
    },
    resetStatus(state) {
      state.status = null;
    },
    setUserData(state, action) {
      const { username, email, image: imageUrl, token } = action.payload;
      state.userData = { username, email, imageUrl, token };
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.error = null;
    },
    [fetchUserData.fulfilled]: (state) => {
      state.status = 'registered';
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = 'rejected';
      const {
        data: { errors },
        status,
      } = action.payload;

      if (status === 422) {
        state.error = errors;
      }
    },

    [fetchUserLog.pending]: (state) => {
      state.error = null;
    },
    [fetchUserLog.fulfilled]: (state) => {
      state.status = 'logined';
    },
    [fetchUserLog.rejected]: (state, action) => {
      state.status = 'rejected';
      const {
        data: { errors },
        status,
      } = action.payload;

      if (status === 422) {
        state.error = errors;
      }
    },
  },
});

export const { addUser, clearError, resetStatus, setUserData } = userSlice.actions;
export default userSlice.reducer;
