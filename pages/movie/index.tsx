import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMovies, fetchLoadMoreMovies } from '@/redux/movieSlice';
import { ItemView, Meta } from '@/components';

const Movie = () => {
  const dispatch = useAppDispatch();
  const { loading, loadingMore, items, page, total_pages } = useAppSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(fetchLoadMoreMovies(page + 1));
  };

  return (
    <>
      <Meta
        title="TV Film - All Movies"
        description="List of all movies of the website"
        image="/preview.png"
      />
      <ItemView
        loading={loading}
        loadingMore={loadingMore}
        items={items}
        page={page}
        total_pages={total_pages}
        loadMore={loadMore}
        media_type="movie"
      />
    </>
  );
};

export default Movie;
