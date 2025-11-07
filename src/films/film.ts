import { type UrlLink } from "../shared/request-helpers.ts";

export interface FilmResponse {
  title: string;
  episode_id: number;
  opening_crawl: number;
  director: string;
  producer: string;
  release_date: string;
  characters: UrlLink[];
  planets: UrlLink[];
  starships: UrlLink[];
  vehicles: UrlLink[];
  species: UrlLink[];
  created: string;
  edited: string;
  url: UrlLink;
}

export interface FilmData extends FilmResponse {
  characterNames: string[];
}
