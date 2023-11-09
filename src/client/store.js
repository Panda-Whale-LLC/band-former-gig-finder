//simple store for testing

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './slices/authService';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;