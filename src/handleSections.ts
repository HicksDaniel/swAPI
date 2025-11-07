import { renderFilms, renderPlanets, renderCharacters } from "./templates.ts";
import type { selectableCategory } from "./interfaces.ts";
import { fetchHandler } from "./fetchHandler.ts";

const displayConfig = {
  films: renderFilms,
  people: renderCharacters,
  planets: renderPlanets,
};

export async function displayFilms(category: selectableCategory) {
  if (!category) return;

  const data = await fetchHandler(category);

  const outputHTML = data
    .map((item) => displayConfig[category](item as any))
    .filter((html) => html.trim() !== "")
    .join("");

  document.querySelector<HTMLDivElement>(`#${category}`)!.style.display = "block";
  document.querySelector(`#${category}`)!.innerHTML = outputHTML;
}
