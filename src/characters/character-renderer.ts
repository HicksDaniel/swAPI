import {
  BASE_URL,
  jsonFetch,
  type PaginatedResponse,
} from "../shared/request-helpers.ts";
import { type CharacterData, type CharacterResponse } from "./character.ts";
import { type FilmData } from "../films/film.ts";
import { type PlanetResponse } from "../planets/planet.ts";

let fetchCache: CharacterData[] = [];

export const characterRender = async (): Promise<string> => {
  const characters = await fetchCharacterData();

  const characterHTMLEntries = characters.map((character) => {
    return `<div class="characters">
      <h3>${character.name}</h3>
      <h4>HomeWorld: ${character.homeworldName}</h4>
        <ul>
          <li>Films:</li>
          ${character.filmNames
            .map((filmName) => `<li>${filmName}</li>`)
            .join("")}
        </ul>
   </div>`;
  });
  return characterHTMLEntries.join("");
};

const fetchCharacterData = async () => {
  let characterWithData: CharacterData[] = [];

  if (fetchCache.length > 0) {
    characterWithData = fetchCache;
    return characterWithData;
  }

  const characterDataResponse = await jsonFetch<
    PaginatedResponse<CharacterResponse>
  >(`${BASE_URL}/people`);

  for (const character of characterDataResponse.results) {
    const filmPromises = character.films.map((filmUrl: string) =>
      jsonFetch<FilmData>(filmUrl)
    );
    const filmData = await Promise.all(filmPromises);

    const homeworld = await jsonFetch<PlanetResponse>(character.homeworld);

    characterWithData.push({
      ...character,
      filmNames: filmData.map((film) => film.title),
      homeworldName: homeworld.name,
    });
  }

  fetchCache = characterWithData;
  return characterWithData;
};
