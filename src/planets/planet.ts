import {type UrlLink} from "../shared/request-helpers.ts";

export interface PlanetResponse {
  climate: string;
  created: string;
  diameter: number;
  edited: string;
  films: UrlLink[];
  name: string;
  orbital_period: number;
  population: number;
  residents: UrlLink[];
  rotation_period: number;
  surface_water: number;
  terrain: string;
  url: string;
}

export interface PlanetData extends PlanetResponse {
  residentNames: string[];
}