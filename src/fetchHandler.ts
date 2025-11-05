import type { APIResponses } from "./interfaces.ts";
import { CharactersFromFilm, CharactersFromPlanet, CharacterData } from "./fetchRequests.ts";
import type { selectableCategory } from "./interfaces.ts";

const routerConfig = {
  films: CharactersFromFilm,
  people: CharacterData,
  planets: CharactersFromPlanet,
};

const BASE_URL = "https://swapi.dev/api/";

export async function fetchHandler(category: selectableCategory): Promise<APIResponses[]> {
  const res = await fetch(`${BASE_URL}${category}`);
  const data = await res.json();

  const returnedData = [];

  for (const urls of data.results) {
    let results = await routerConfig[category](urls);
    returnedData.push(results);
  }

  return returnedData;
}
