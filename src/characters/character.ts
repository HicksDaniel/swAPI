import {type UrlLink} from "../shared/request-helpers.ts";

export interface CharacterResponse {
  birth_year: string;
  eye_color: string;
  films: UrlLink[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: UrlLink[];
  starships: UrlLink[];
  url: UrlLink;
  vehicles: UrlLink[];
}


export interface CharacterData extends CharacterResponse {
  homeworldName: string;
  filmNames: string[];
}
