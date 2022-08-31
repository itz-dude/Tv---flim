import { configureStore } from '@reduxjs/toolkit';

import modal from './modalSlice';
import movie from './movieSlice';
import tv from './tvSlice';

const store = configureStore({
  reducer: {
    modal,
    movie,
    tv,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
