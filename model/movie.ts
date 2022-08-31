export type MediaType = 'all' | 'movie' | 'tv';

export interface Childs {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  name: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  release_date: string;
  homepage: string;
}

export interface MovieItemProps extends Childs {
  adult?: boolean;
  media_type: 'movie' | 'tv';
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface VideoTrailer {
  name: string;
  key: string;
}
