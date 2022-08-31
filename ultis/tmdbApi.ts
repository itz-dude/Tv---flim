import axiosClient from './axiosClient';
import { TypeTvDetail } from '@/model/tv';

export const getHomeData: () => Promise<any> = async () => {
  const HomeAPIRoutes: {
    [key: string]: { url: string; media_type: 'tv' | 'movie' };
  } = {
    'Trending Movies': { url: '/trending/movie/week', media_type: 'movie' },
    'Popular Movies': { url: '/movie/popular', media_type: 'movie' },
    'Top Rated Movies': { url: '/movie/top_rated', media_type: 'movie' },
    'Trending TV': { url: '/trending/tv/week', media_type: 'tv' },
    'Popular TV': { url: '/tv/popular', media_type: 'tv' },
    'Top Rated TV': { url: '/tv/top_rated', media_type: 'tv' },
  };

  const promises = await Promise.all(
    Object.keys(HomeAPIRoutes).map((item) =>
      axiosClient.get(HomeAPIRoutes[item].url, { params: {} })
    )
  );

  const data = promises.reduce((final, current: any, index) => {
    final[Object.keys(HomeAPIRoutes)[index]] = current.results.map(
      (item: any) => ({
        ...item,
        media_type: HomeAPIRoutes[Object.keys(HomeAPIRoutes)[index]].media_type,
      })
    );
    return final;
  }, {} as any);

  return data;
};

export const getMovieDetails: (_id: number) => Promise<any> = async (id) => {
  const labels = ['data', 'casts', 'similar', 'videos'];
  const params = {
    params: {},
  };

  const result = (
    await Promise.all([
      axiosClient.get(`/movie/${id}`, params),
      axiosClient.get(`/movie/${id}/credits`, params),
      axiosClient.get(`/movie/${id}/similar`, params),
      axiosClient.get(`/movie/${id}/videos`, params),
    ])
  ).reduce((final, current: any, index) => {
    if (labels[index] === 'data') {
      final[labels[index]] = current;
    } else if (labels[index] === 'casts') {
      final[labels[index]] = current.cast
        .filter((item: any) => item.name && item.character && item.profile_path)
        .slice(0, 10);
    } else if (labels[index] === 'similar') {
      final[labels[index]] = current.results.map((item: any) => ({
        ...item,
        media_type: 'movie',
      }));
    } else if (labels[index] === 'videos') {
      final[labels[index]] = current.results.filter(
        (item: any) => item.name && item.site === 'YouTube'
      );
    }

    return final;
  }, {} as any);

  return result;
};

export const getTVDetails: (_id: number) => Promise<any> = async (id) => {
  const labels = ['data', 'casts', 'similar', 'videos'];
  const params = {
    params: {},
  };

  const result = (
    await Promise.all([
      axiosClient.get(`/tv/${id}`, params),
      axiosClient.get(`/tv/${id}/credits`, params),
      axiosClient.get(`/tv/${id}/similar`, params),
      axiosClient.get(`/tv/${id}/videos`, params),
    ])
  ).reduce((final, current: any, index) => {
    if (labels[index] === 'data') {
      final[labels[index]] = current;
    } else if (labels[index] === 'casts') {
      final[labels[index]] = current.cast
        .filter((item: any) => item.name && item.character && item.profile_path)
        .slice(0, 10);
    } else if (labels[index] === 'similar') {
      final[labels[index]] = current.results.map((item: any) => ({
        ...item,
        media_type: 'tv',
      }));
    } else if (labels[index] === 'videos') {
      final[labels[index]] = current.results.filter(
        (item: any) => item.name && item.site === 'YouTube'
      );
    }

    return final;
  }, {} as any);

  return result;
};

export const getMovieTrailer = async (id: number) =>
  await axiosClient.get(`/movie/${id}/videos`, { params: {} });

export const getMovies: (_page?: number) => Promise<any> = async (page = 1) =>
  await axiosClient.get('movie/upcoming', { params: { page } });

export const getTVs: (_page?: number) => Promise<any> = async (page = 1) =>
  await axiosClient.get('tv/popular', { params: { page } });

export const getWatchMovieDetail: (_id: number) => Promise<any> = async (
  id
) => {
  const labels = ['data', 'similar'];
  const params = {
    params: {},
  };

  const result = (
    await Promise.all([
      axiosClient.get(`/movie/${id}`, params),
      axiosClient.get(`/movie/${id}/similar`, params),
    ])
  ).reduce((final, current: any, index) => {
    if (labels[index] === 'data') {
      final[labels[index]] = current;
    } else if (labels[index] === 'similar') {
      final[labels[index]] = current.results.map((item: any) => ({
        ...item,
        media_type: 'movie',
      }));
    }
    return final;
  }, {} as any);

  return result;
};

export const getWatchTVDetail: (_id: number) => Promise<any> = async (id) => {
  const labels = ['data', 'similar'];
  const params = {
    params: {},
  };

  const result = (
    await Promise.all([
      axiosClient.get(`/tv/${id}`, params),
      axiosClient.get(`/tv/${id}/similar`, params),
    ])
  ).reduce((final, current: any, index) => {
    if (labels[index] === 'data') {
      final[labels[index]] = current;
    } else if (labels[index] === 'similar') {
      final[labels[index]] = current.results.map((item: any) => ({
        ...item,
        media_type: 'tv',
      }));
    }
    return final;
  }, {} as any);

  return result;
};

export const getTVSeasons: (_id: number) => Promise<any> = async (id) => {
  const params = {
    params: {},
  };
  const data = (await axiosClient.get(`tv/${id}`, params)) as TypeTvDetail;

  if (data.seasons.length === 0) throw new Error('404');

  const res = await Promise.all(
    data.seasons.map((item) =>
      axiosClient.get(`tv/${id}/season/${item.season_number}`, params)
    )
  );

  const seasons = res.filter(
    (item: any) =>
      item.name &&
      item.poster_path &&
      item.episodes.length > 0 &&
      item.episodes.every((child: any) => child.name && child.still_path)
  );

  return {
    seasons,
    data,
  };
};

export const searchAll: (
  _query: string,
  _page?: number
) => Promise<any> = async (query, page = 1) => {
  const data: any = await axiosClient.get('/search/multi', {
    params: { query, page },
  });

  return {
    ...data,
    results: data.results.filter((item: any) => item.poster_path),
  };
};

export const searchMovie: (
  _query: string,
  _page?: number
) => Promise<any> = async (query, page = 1) => {
  const data: any = await axiosClient.get('/search/movie', {
    params: { query, page },
  });

  return {
    ...data,
    results: data.results.filter((item: any) => item.poster_path),
  };
};

export const searchTV: (
  _query: string,
  _page?: number
) => Promise<any> = async (query, page = 1) => {
  const data: any = await axiosClient.get('/search/tv', {
    params: { query, page },
  });

  return {
    ...data,
    results: data.results.filter((item: any) => item.poster_path),
  };
};
// export default tmdbApi;
