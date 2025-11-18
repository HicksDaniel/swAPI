import {
  BASE_URL,
  jsonFetch,
  type PaginatedResponse,
} from "../shared/request-helpers.ts";
import { type FilmData, type FilmResponse } from "./film.ts";
import { type CharacterResponse } from "../characters/character.ts";

let fetchCache: FilmData[] = [];

export async function renderFilms(auth0Client: any): Promise<string> {
  const filmsWithCharacters = await fetchFilmsWithCharacters(auth0Client);

  const allFilmHtmlEntries = filmsWithCharacters.map((film) => {
    return `<div class="film">
        <h3>${film.title}</h3>
        <p>Episode ${film.episode_id}</p>
        <p>Director: ${film.director}</p>
        <ul>
          <li>Characters:</li>
          ${film.characterNames.map((name) => `<li>${name}</li>`).join("")}
        </ul>
      </div>`;
  });

  return allFilmHtmlEntries.join("\n");
}

async function fetchFilmsWithCharacters(auth0Client: any) {
  let populatedFilmData: FilmData[] = [];

  if (fetchCache.length > 0) {
    populatedFilmData = fetchCache;
    return populatedFilmData;
  }
  const filmPaginatedResponse = await jsonFetch<
    PaginatedResponse<FilmResponse>
  >(`${BASE_URL}/films`, auth0Client);

  for (const filmResponse of filmPaginatedResponse.results) {
    const characterPromises = filmResponse.characters.map((characterLink) => {
      return jsonFetch<CharacterResponse>(characterLink, auth0Client);
    });

    const characters = await Promise.all(characterPromises);

    populatedFilmData.push({
      ...filmResponse,
      characterNames: characters.map((char) => char.name),
    });
  }

  fetchCache = populatedFilmData;
  return populatedFilmData;
}
