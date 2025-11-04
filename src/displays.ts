import { renderFilms, renderPlanets, renderCharacters } from "./templates.ts";
import { populateData } from "./dataService.ts";

export const filmsDisplay = (value: string) => {
  populateData(value, "films", renderFilms);
};

export const planetsDisplay = (value: string) => {
  populateData(value, "planets", renderPlanets);
};
export const characterDisplay = (value: string) => {
  populateData(value, "characters", renderCharacters);
};



