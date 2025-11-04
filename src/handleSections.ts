import { filmsDisplay, planetsDisplay, characterDisplay } from "./displays.ts";

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
      document.querySelector<HTMLDivElement>("#films")!.style.display = "block";
      filmsDisplay("films");
      break;
    case "characters":
      document.querySelector<HTMLDivElement>("#characters")!.style.display = "block";
      characterDisplay("people");
      break;
    case "planets":
      document.querySelector<HTMLDivElement>("#planets")!.style.display = "block";
      planetsDisplay("planets");
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
