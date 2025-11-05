import { renderFilms, renderPlanets, renderCharacters } from "./templates.ts";

import { populateData } from "./dataService.ts";

export const hideAllSections = () => {
  document.querySelector<HTMLDivElement>("#films")!.style.display = "none";
  document.querySelector<HTMLDivElement>("#planets")!.style.display = "none";
  document.querySelector<HTMLDivElement>("#characters")!.style.display = "none";
};

export const selectedDisplay = (category: string = "") => {
  hideAllSections();

  switch (category) {
    case "":
      return;
    case "films":
      document.querySelector<HTMLDivElement>(`#${category}`)!.style.display = "block";
      populateData(category, renderFilms);
      break;
    case "characters":
      document.querySelector<HTMLDivElement>(`#${category}`)!.style.display = "block";
      populateData(category, renderCharacters);
      break;
    case "planets":
      document.querySelector<HTMLDivElement>(`#${category}`)!.style.display = "block";
      populateData(category, renderPlanets);
      break;
  }
};

export async function displayFilms() {
  const dropdownSelection = document.querySelector<HTMLSelectElement>("#category-dropdown")!;

  try {
    dropdownSelection.addEventListener("change", (event) => {
      const selectedCategory = (event.target as HTMLSelectElement).value;
      selectedDisplay(selectedCategory);
    });
  } catch (error) {
    console.error("Error:", error);
  }

  hideAllSections();
}
