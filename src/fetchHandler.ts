import type { APIResponses } from "./interfaces.ts";
import { CharactersFromFilm, CharactersFromPlanet, CharacterData } from "./fetchRequests.ts";
import type { selectableCategory } from "./interfaces.ts";

const routerConfig = {
  films: CharactersFromFilm,
  people: CharacterData,
  planets: CharactersFromPlanet,
};

const BASE_URL = "https://swapi.dev/api/";

const fetchCache: { [key: string]: APIResponses[] } = {};

export async function fetchHandler(category: selectableCategory): Promise<APIResponses[]> {
  if (fetchCache[category]) {
    return fetchCache[category];
  }

  const res = await fetch(`${BASE_URL}${category}/`);
  const data = await res.json();

  const returnedData = [];

  for (const urls of data.results) {
    let results = await routerConfig[category](urls);
    returnedData.push(results);
  }

  fetchCache[category] = returnedData;
  return returnedData;
}
