import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTVs, fetchLoadMoreTVs } from '@/redux/tvSlice';
import { ItemView, Meta } from '@/components';

const TV = () => {
  const dispatch = useAppDispatch();
  const { loading, loadingMore, items, page, total_pages } = useAppSelector(
    (state) => state.tv
  );

  useEffect(() => {
    dispatch(fetchTVs());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(fetchLoadMoreTVs(page + 1));
  };

  return (
    <>
      <Meta
        title="TV Film - All TV shows"
        description="List of all TV shows of the website"
        image="/preview.png"
      />
      <ItemView
        loading={loading}
        loadingMore={loadingMore}
        items={items}
        page={page}
        total_pages={total_pages}
        loadMore={loadMore}
        media_type="tv"
      />
    </>
  );
};

export default TV;
