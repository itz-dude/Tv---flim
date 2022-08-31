import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMovieTrailer } from '@/ultis/tmdbApi';

export const fetchMovieTrailer = createAsyncThunk(
  'modal/fetchMovieTrailer',
  getMovieTrailer
);

interface Params {
  loading: boolean;
  idVisible?: number;
  trailerEndPoint?: string;
}

const initialState: Params = {
  loading: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    activeModalId: (state, { payload }) => {
      state.idVisible = payload;
      if (!payload) {
        state.trailerEndPoint = undefined;
      }
    },
  },
  extraReducers: {
    [fetchMovieTrailer.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchMovieTrailer.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.trailerEndPoint = payload.results[0].key;
    },
  },
});

export const { activeModalId } = modalSlice.actions;
export default modalSlice.reducer;
