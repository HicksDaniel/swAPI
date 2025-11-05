export interface FILMObject {
  title: string;
  episode_id: number;
  characters: string[];
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}
export interface PLANETObject {
  climate: string;
  created: string;
  diameter: number;
  edited: string;
  films: string[];
  name: string;
  orbital_period: number;
  population: number;
  residents: string[];
  rotation_period: number;
  surface_water: number;
  terrain: string;
  url: string;
}

export interface CHARACTERObject {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export type APIResponses = CHARACTERObject | FILMObject | PLANETObject;

export interface FilmsResponse {
  results?: APIResponses[];
}

export type selectableCategory = "films" | "people" | "planets";
