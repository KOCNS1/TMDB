export interface Search {
  page: number;
  results: Result[];
  total_results: number;
  total_pages: number;
}

export interface Result {
  poster_path?: null | string;
  popularity: number;
  id: number;
  overview?: string;
  backdrop_path?: null | string;
  vote_average?: number;
  media_type: MediaType;
  first_air_date?: string;
  origin_country?: string[];
  genre_ids?: number[];
  original_language?: OriginalLanguage;
  vote_count?: number;
  name?: string;
  original_name?: string;
  adult?: boolean;
  release_date?: Date;
  original_title?: string;
  title?: string;
  video?: boolean;
  profile_path?: null | string;
  known_for?: Result[];
}

export enum MediaType {
  Movie = 'movie',
  Person = 'person',
  Tv = 'tv',
}

export enum OriginalLanguage {
  En = 'en',
}
