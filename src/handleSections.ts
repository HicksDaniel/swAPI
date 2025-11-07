import { renderFilms, renderPlanets, renderCharacters } from "./templates.ts";
import type { selectableCategory } from "./interfaces.ts";
import { fetchHandler } from "./fetchHandler.ts";

const displayConfig = {
  films: renderFilms,
  people: renderCharacters,
  planets: renderPlanets,
};

export async function handleSections(category: selectableCategory) {
  const categoryDiv = document.querySelector<HTMLDivElement>(`#${category}`);

  if (!categoryDiv) return;

  const data = await fetchHandler(category);

  const outputHTML = data
    .map((item) => displayConfig[category](item as any))
    .filter((html) => html.trim() !== "")
    .join("");

  categoryDiv.style.display = "block";
  categoryDiv.innerHTML = outputHTML;
}
