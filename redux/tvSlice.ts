import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTVs } from '@/ultis/tmdbApi';
import { MovieItemProps } from '@/model/movie';

export const fetchTVs = createAsyncThunk('tv/fetchTVs', getTVs);

export const fetchLoadMoreTVs = createAsyncThunk('tv/fetchLoadMoreTVs', getTVs);

interface TVSliceParams {
  loading: boolean;
  loadingMore: boolean;
  items: MovieItemProps[];
  page: number;
  total_pages: number;
}

const initialState: TVSliceParams = {
  loading: false,
  loadingMore: false,
  items: [],
  page: 1,
  total_pages: 20,
};

export const movieSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTVs.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchTVs.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.items = payload.results.map((item: MovieItemProps) => ({
        ...item,
        media_type: 'tv',
      }));
      state.page = payload.page;
      state.total_pages = payload.total_pages;
    },

    [fetchLoadMoreTVs.pending.type]: (state) => {
      state.loadingMore = true;
    },
    [fetchLoadMoreTVs.fulfilled.type]: (state, { payload }) => {
      state.loadingMore = false;
      state.items = [
        ...state.items,
        ...payload.results.map((item: MovieItemProps) => ({
          ...item,
          media_type: 'tv',
        })),
      ];
      state.page = payload.page;
    },
  },
});

export default movieSlice.reducer;
