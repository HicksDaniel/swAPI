import {BASE_URL, jsonFetch, type PaginatedResponse} from "../shared/request-helpers.ts";
import {type PlanetData, type PlanetResponse} from "./planet.ts";
import {type CharacterResponse} from "../characters/character.ts";

export async function renderPlanets(): Promise<string> {
  const planetsWithResidents = await fetchPlanetsWithCharacters();

  const planetHtmlEntries = planetsWithResidents.map(planet => {
    return `<div class = "planet">
      <h3>${planet.name}</h3>
        <ul>
          <li>Characters:</li>
          ${planet.residentNames.map((name) => `<li>${name}</li>`).join("")}
        </ul>
        </div>`;
  });

  return planetHtmlEntries.join('');
}

async function fetchPlanetsWithCharacters() {
  const planetsPaginatedResponse = await jsonFetch<PaginatedResponse<PlanetResponse>>(`${BASE_URL}/planets`);
  const populatedPlanetData: PlanetData[] = [];

  for (const planet of planetsPaginatedResponse.results) {
    const residentPromises = planet.residents.map(res => jsonFetch<CharacterResponse>(res));
    const residents = await Promise.all(residentPromises);
    populatedPlanetData.push({
      ...planet,
      residentNames: residents.map(res => res.name),
    })
  }

  return populatedPlanetData;
}