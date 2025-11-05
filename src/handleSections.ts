import { renderFilms, renderPlanets, renderCharacters } from "./templates.ts";
import type { selectableCategory } from "./interfaces.ts";

import { populateData } from "./dataService.ts";

const hideAllSections = () => {
  document.querySelector<HTMLDivElement>("#films")!.style.display = "none";
  document.querySelector<HTMLDivElement>("#planets")!.style.display = "none";
  document.querySelector<HTMLDivElement>("#people")!.style.display = "none";
};

const displayConfig = {
  films: renderFilms,
  people: renderCharacters,
  planets: renderPlanets,
};

export async function displayFilms() {
  const dropdownSelection = document.querySelector<HTMLSelectElement>("#category-dropdown")!;

  hideAllSections();

  try {
    dropdownSelection.addEventListener("change", (event) => {
      const category = (event.target as HTMLSelectElement).value as selectableCategory;

      document.querySelector<HTMLDivElement>(`#${category}`)!.style.display = "block";
      populateData(category, displayConfig[category]);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
