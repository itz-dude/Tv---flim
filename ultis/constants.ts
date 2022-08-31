import { MediaType } from '@/model/movie';

export const TMDB_API = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE = 'https://image.tmdb.org/t/p/';

export const mediaTypes: MediaType[] = ['all', 'movie', 'tv'];

export const imageOriginal = (imgPath: string) =>
  `${TMDB_IMAGE}original${imgPath}`;
export const w500Image = (imgPath: string) => `${TMDB_IMAGE}w500${imgPath}`;
export const embedMovie = (id: number) => `https://2embed.org/embed/${id}`;
export const imageResize = (src: string, dimension: string = 'w200') =>
  `${TMDB_IMAGE}${dimension}${src}`;
export const embedEpisode = (id: number, season: number, episode: number) =>
  `https://2embed.org/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`;

export const airDate = (firstAir: string, lastAir: string) => {
  return firstAir === lastAir ? firstAir : `${firstAir} - ${lastAir}`;
};

export const xEpisodes = (id: number) =>
  id === 1 ? `${id} Episode` : `${id} Episodes`;
