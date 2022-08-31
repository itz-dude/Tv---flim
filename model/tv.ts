import { Childs } from '@/model/movie';

export interface Episode {
  id: number;
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Season {
  id: number;
  episodes: Episode[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TypeTvDetail extends Childs {
  first_air_date: string;
  last_air_date: string;
  seasons: {
    episode_count: number;
    season_number: number;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
}
