export interface Message {
  message: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
export interface GenericListResult<T> {
  total_pages: number;
  total_results: number;
  page: number;
  results: T[];
}
interface SeasonOverview {
  air_date: Date;
  episode_count: number;
  id: number;
  poster_path: string | null;
  season_number: number;
}
export interface TVDetails {
  backdrop_path: string | null;
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string | null;
  id: number;
  in_prodution: boolean;
  languages: Language[];
  last_air_date: Date | null;
  name: string;
  networks: object[]; // TODO create network interface
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Country[];
  original_language: Language;
  original_name: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  seasons: SeasonOverview[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  keywords: Keyword[];
  casts: Casts;
  images: Images;
  adult: boolean;
  created_by: CreatedBy[];
  in_production: boolean;
  last_episode_to_air: TEpisodeToAir;
  next_episode_to_air: TEpisodeToAir;
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  tagline: string;
}
export interface Casts {
  cast: Cast[];
  crew: Cast[];
}
export interface Videos {
  results: Result[];
}

export interface Result {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: Date;
  site: string;
  size: number;
  type: string;
}

export interface TEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}
export interface CreatedBy {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

export type AppendToResponseTv =
  | "account_states"
  | "alternative_titles"
  | "changes"
  | "credits"
  | "external_ids"
  | "images"
  | "keywords"
  | "lists"
  | "recommendations"
  | "release_dates"
  | "reviews"
  | "similar"
  | "translations"
  | "cast"
  | "videos";

export interface Tv {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: Date;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[] | null;
  production_countries: ProductionCountry[] | null;
  release_date: Date;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[] | null;
  status: MovieStatus;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits | null;
  images: Images | null;
  videos: Videos;
  account_states: AccountStates | null;
  alternative_titles: Title[] | null;
  external_ids: ExternalIds | null;
  changes: Change<Date> | null;
  keywords: Keyword[] | null;
  lists: GenericListResult<List> | null;
  casts: Casts;
}

export interface Image {
  aspect_ration: number;
  file_path: string;
  height: number;
  iso_639_1: Language | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

export interface Images {
  backdrops: Image[];
  posters: Image[];
  logos: Image[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: Language;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: Country;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: Country;
}

enum Country {
  Afghanistan = "AF",
  AlandIslands = "AX",
  Albania = "AL",
  Algeria = "DZ",
  AmericanSamoa = "AS",
  Andorra = "AD",
  Angola = "AO",
  Anguilla = "AI",
  Antarctica = "AQ",
  AntiguaAndBarbuda = "AG",
  Argentina = "AR",
  Armenia = "AM",
  Aruba = "AW",
  Australia = "AU",
  Austria = "AT",
  Azerbaijan = "AZ",
  Bahamas = "BS",
  Bahrain = "BH",
  Bangladesh = "BD",
  Barbados = "BB",
  Belarus = "BY",
  Belgium = "BE",
  Belize = "BZ",
  Benin = "BJ",
  Bermuda = "BM",
  Bhutan = "BT",
  Bolivia = "BO",
  BonaireSintEustatiusSaba = "BQ",
  BosniaAndHerzegovina = "BA",
  Botswana = "BW",
  BouvetIsland = "BV",
  Brazil = "BR",
  BritishIndianOceanTerritory = "IO",
  BruneiDarussalam = "BN",
  Bulgaria = "BG",
  BurkinaFaso = "BF",
  Burundi = "BI",
  Cambodia = "KH",
  Cameroon = "CM",
  Canada = "CA",
  CapeVerde = "CV",
  CaymanIslands = "KY",
  CentralAfricanRepublic = "CF",
  Chad = "TD",
  Chile = "CL",
  China = "CN",
  ChristmasIsland = "CX",
  CocosKeelingIslands = "CC",
  Colombia = "CO",
  Comoros = "KM",
  Congo = "CG",
  CongoDemocraticRepublic = "CD",
  CookIslands = "CK",
  CostaRica = "CR",
  CoteDIvoire = "CI",
  Croatia = "HR",
  Cuba = "CU",
  Curaçao = "CW",
  Cyprus = "CY",
  CzechRepublic = "CZ",
  Denmark = "DK",
  Djibouti = "DJ",
  Dominica = "DM",
  DominicanRepublic = "DO",
  Ecuador = "EC",
  Egypt = "EG",
  ElSalvador = "SV",
  EquatorialGuinea = "GQ",
  Eritrea = "ER",
  Estonia = "EE",
  Ethiopia = "ET",
  FalklandIslands = "FK",
  FaroeIslands = "FO",
  Fiji = "FJ",
  Finland = "FI",
  France = "FR",
  FrenchGuiana = "GF",
  FrenchPolynesia = "PF",
  FrenchSouthernTerritories = "TF",
  Gabon = "GA",
  Gambia = "GM",
  Georgia = "GE",
  Germany = "DE",
  Ghana = "GH",
  Gibraltar = "GI",
  Greece = "GR",
  Greenland = "GL",
  Grenada = "GD",
  Guadeloupe = "GP",
  Guam = "GU",
  Guatemala = "GT",
  Guernsey = "GG",
  Guinea = "GN",
  GuineaBissau = "GW",
  Guyana = "GY",
  Haiti = "HT",
  HeardIslandMcdonaldIslands = "HM",
  HolySeeVaticanCityState = "VA",
  Honduras = "HN",
  HongKong = "HK",
  Hungary = "HU",
  Iceland = "IS",
  India = "IN",
  Indonesia = "ID",
  Iran = "IR",
  Iraq = "IQ",
  Ireland = "IE",
  IsleOfMan = "IM",
  Israel = "IL",
  Italy = "IT",
  Jamaica = "JM",
  Japan = "JP",
  Jersey = "JE",
  Jordan = "JO",
  Kazakhstan = "KZ",
  Kenya = "KE",
  Kiribati = "KI",
  Korea = "KR",
  KoreaDemocraticPeoplesRepublic = "KP",
  Kuwait = "KW",
  Kyrgyzstan = "KG",
  LaoPeoplesDemocraticRepublic = "LA",
  Latvia = "LV",
  Lebanon = "LB",
  Lesotho = "LS",
  Liberia = "LR",
  LibyanArabJamahiriya = "LY",
  Liechtenstein = "LI",
  Lithuania = "LT",
  Luxembourg = "LU",
  Macao = "MO",
  Macedonia = "MK",
  Madagascar = "MG",
  Malawi = "MW",
  Malaysia = "MY",
  Maldives = "MV",
  Mali = "ML",
  Malta = "MT",
  MarshallIslands = "MH",
  Martinique = "MQ",
  Mauritania = "MR",
  Mauritius = "MU",
  Mayotte = "YT",
  Mexico = "MX",
  Micronesia = "FM",
  Moldova = "MD",
  Monaco = "MC",
  Mongolia = "MN",
  Montenegro = "ME",
  Montserrat = "MS",
  Morocco = "MA",
  Mozambique = "MZ",
  Myanmar = "MM",
  Namibia = "NA",
  Nauru = "NR",
  Nepal = "NP",
  Netherlands = "NL",
  NewCaledonia = "NC",
  NewZealand = "NZ",
  Nicaragua = "NI",
  Niger = "NE",
  Nigeria = "NG",
  Niue = "NU",
  NorfolkIsland = "NF",
  NorthernMarianaIslands = "MP",
  Norway = "NO",
  Oman = "OM",
  Pakistan = "PK",
  Palau = "PW",
  PalestinianTerritory = "PS",
  Panama = "PA",
  PapuaNewGuinea = "PG",
  Paraguay = "PY",
  Peru = "PE",
  Philippines = "PH",
  Pitcairn = "PN",
  Poland = "PL",
  Portugal = "PT",
  PuertoRico = "PR",
  Qatar = "QA",
  Reunion = "RE",
  Romania = "RO",
  RussianFederation = "RU",
  Rwanda = "RW",
  SaintBarthelemy = "BL",
  SaintHelena = "SH",
  SaintKittsAndNevis = "KN",
  SaintLucia = "LC",
  SaintMartin = "MF",
  SaintPierreAndMiquelon = "PM",
  SaintVincentAndGrenadines = "VC",
  Samoa = "WS",
  SanMarino = "SM",
  SaoTomeAndPrincipe = "ST",
  SaudiArabia = "SA",
  Senegal = "SN",
  Serbia = "RS",
  Seychelles = "SC",
  SierraLeone = "SL",
  Singapore = "SG",
  SintMaarten = "SX",
  Slovakia = "SK",
  Slovenia = "SI",
  SolomonIslands = "SB",
  Somalia = "SO",
  SouthAfrica = "ZA",
  SouthGeorgiaAndSandwichIsl = "GS",
  SouthSudan = "SS",
  Spain = "ES",
  SriLanka = "LK",
  Sudan = "SD",
  Suriname = "SR",
  SvalbardAndJanMayen = "SJ",
  Swaziland = "SZ",
  Sweden = "SE",
  Switzerland = "CH",
  SyrianArabRepublic = "SY",
  Taiwan = "TW",
  Tajikistan = "TJ",
  Tanzania = "TZ",
  Thailand = "TH",
  TimorLeste = "TL",
  Togo = "TG",
  Tokelau = "TK",
  Tonga = "TO",
  TrinidadAndTobago = "TT",
  Tunisia = "TN",
  Turkey = "TR",
  Turkmenistan = "TM",
  TurksAndCaicosIslands = "TC",
  Tuvalu = "TV",
  Uganda = "UG",
  Ukraine = "UA",
  UnitedArabEmirates = "AE",
  UnitedKingdom = "GB",
  UnitedStates = "US",
  UnitedStatesOutlyingIslands = "UM",
  Uruguay = "UY",
  Uzbekistan = "UZ",
  Vanuatu = "VU",
  Venezuela = "VE",
  Vietnam = "VN",
  VirginIslandsBritish = "VG",
  VirginIslandsUS = "VI",
  WallisAndFutuna = "WF",
  WesternSahara = "EH",
  Yemen = "YE",
  Zambia = "ZM",
  Zimbabwe = "ZW",
} // thank you kyranjamie

export interface Video {
  iso_639_1: Language;
  iso_3166_1: Country;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface Person {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: number;
}

export interface Cast extends Person {
  cast_id: number;
  character: string;
  order: number;
}

export interface PopularInput {
  page?: number;
  region?: Country;
}

export interface Crew extends Person {
  department: string;
  job: string;
}

export type MovieStatus =
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Released"
  | "Canceled"
  | "Unknown";

export type Language =
  | "aa"
  | "hy"
  | "or"
  | "ab"
  | "hz"
  | "os"
  | "af"
  | "id"
  | "pa"
  | "ak"
  | "ig"
  | "pl"
  | "am"
  | "ii"
  | "ps"
  | "an"
  | "ik"
  | "pt"
  | "ar"
  | "io"
  | "qu"
  | "as"
  | "is"
  | "rm"
  | "av"
  | "it"
  | "rn"
  | "ay"
  | "iu"
  | "ro"
  | "az"
  | "ja"
  | "ru"
  | "ba"
  | "jv"
  | "rw"
  | "be"
  | "ka"
  | "sa"
  | "bg"
  | "kg"
  | "sc"
  | "bh"
  | "ki"
  | "sd"
  | "bi"
  | "kj"
  | "se"
  | "bm"
  | "kk"
  | "sg"
  | "bn"
  | "kl"
  | "si"
  | "bo"
  | "km"
  | "sk"
  | "br"
  | "kn"
  | "sl"
  | "bs"
  | "ko"
  | "sm"
  | "ca"
  | "kr"
  | "sn"
  | "ce"
  | "ks"
  | "so"
  | "ch"
  | "ku"
  | "sq"
  | "co"
  | "kv"
  | "sr"
  | "cr"
  | "kw"
  | "ss"
  | "cs"
  | "ky"
  | "st"
  | "cv"
  | "lb"
  | "su"
  | "cy"
  | "lg"
  | "sv"
  | "da"
  | "li"
  | "sw"
  | "de"
  | "ln"
  | "ta"
  | "dv"
  | "lo"
  | "te"
  | "dz"
  | "lt"
  | "tg"
  | "ee"
  | "lu"
  | "th"
  | "el"
  | "lv"
  | "ti"
  | "en"
  | "mg"
  | "tk"
  | "es"
  | "mh"
  | "tl"
  | "et"
  | "mi"
  | "tn"
  | "eu"
  | "mk"
  | "to"
  | "fa"
  | "ml"
  | "tr"
  | "ff"
  | "mn"
  | "ts"
  | "fi"
  | "mr"
  | "tt"
  | "fj"
  | "ms"
  | "tw"
  | "fo"
  | "mt"
  | "ty"
  | "fr"
  | "my"
  | "ug"
  | "fy"
  | "na"
  | "uk"
  | "ga"
  | "nb"
  | "ur"
  | "gd"
  | "nd"
  | "uz"
  | "gl"
  | "ne"
  | "ve"
  | "gn"
  | "ng"
  | "vi"
  | "gu"
  | "nl"
  | "wa"
  | "gv"
  | "nn"
  | "wo"
  | "ha"
  | "no"
  | "xh"
  | "he"
  | "nr"
  | "yi"
  | "hi"
  | "nv"
  | "yo"
  | "ho"
  | "ny"
  | "za"
  | "hr"
  | "oc"
  | "zh"
  | "ht"
  | "oj"
  | "zu"
  | "hu"
  | "om";

export interface AccountStates {
  favorite: boolean;
  rated:
    | {
        value: number;
      }
    | boolean;
  watchlist: boolean;
}

export interface List {
  description?: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: Language;
  list_type: string;
  name?: string;
  poster_path?: string;
}

export interface Change<T> {
  key: string;
  items: {
    id: string;
    action: string;
    time: T;
    iso_639_1: Language;
    value: string;
    original_value: string;
  }[];
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Title {
  iso_3166_1: Country;
  title: string;
  type: string;
}

export interface Credits {
  cast: Cast[];

  crew: Crew[];
}

export interface SimilarMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  original_name: string;
  first_air_date: Date;
  name: string;
}

export interface SimilarTv {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: Date;
  name: string;
  vote_average: number;
  vote_count: number;
}
