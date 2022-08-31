import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMovies } from '@/ultis/tmdbApi';
import { MovieItemProps } from '@/model/movie';

export const fetchMovies = createAsyncThunk('movie/fetchMovies', getMovies);

export const fetchLoadMoreMovies = createAsyncThunk(
  'movie/fetchLoadMoreMovies',
  getMovies
);

export interface MovieSliceParams {
  loading: boolean;
  loadingMore: boolean;
  items: MovieItemProps[];
  page: number;
  total_pages: number;
}

const initialState: MovieSliceParams = {
  loading: false,
  loadingMore: false,
  items: [],
  page: 1,
  total_pages: 20,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchMovies.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.page = payload.page;
      state.total_pages = payload.total_pages;
      state.items = payload.results.map((item: MovieItemProps) => ({
        ...item,
        media_type: 'movie',
      }));
    },
    [fetchLoadMoreMovies.pending.type]: (state) => {
      state.loadingMore = true;
    },
    [fetchLoadMoreMovies.fulfilled.type]: (state, { payload }) => {
      state.loadingMore = false;
      state.items = [
        ...state.items,
        ...payload.results.map((item: MovieItemProps) => ({
          ...item,
          media_type: 'movie',
        })),
      ];
      state.page = payload.page;
    },
  },
});

export default movieSlice.reducer;
