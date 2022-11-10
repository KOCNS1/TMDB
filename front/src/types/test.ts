export interface Main {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  casts: Casts;
}

export interface Casts {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export interface Genre {
  id: number;
  name: string;
}

export enum OriginalLanguage {
  En = "en",
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: OriginCountry;
}

export enum OriginCountry {
  Us = "US",
}

export interface ProductionCountry {
  iso_3166_1: OriginCountry;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: OriginalLanguage;
  name: string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: OriginalLanguage;
  iso_3166_1: OriginCountry;
  name: string;
  key: string;
  site: Site;
  size: number;
  type: Type;
  official: boolean;
  published_at: Date;
  id: string;
}

export enum Site {
  YouTube = "YouTube",
}

export enum Type {
  BehindTheScenes = "Behind the Scenes",
  Featurette = "Featurette",
  Teaser = "Teaser",
  Trailer = "Trailer",
}
