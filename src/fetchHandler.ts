import type { APIResponses } from "./interfaces.ts";
import { CharactersFromFilm, CharactersFromPlanet, CharacterData } from "./handleFetchResponse.ts";
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

  const res = await fetch(`${BASE_URL}${category}/1/`); // <------- Wanted my fetch handle a single call and response planets/1/ instead of planets/ as this would return a single object and not an array of them.
  const data = await res.json();

  const returnedData = [];

  if ("results" in data) {
    for (const urls of data.results) {
      let results = await routerConfig[category](urls);
      returnedData.push(results);
    }
  } else {
    let results = await routerConfig[category](data);
    returnedData.push(results);
  }

  fetchCache[category] = returnedData;
  return returnedData;
}
