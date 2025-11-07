import {BASE_URL, jsonFetch, type PaginatedResponse} from "../shared/request-helpers.ts";
import {type FilmData, type FilmResponse} from "./film.ts";
import {type CharacterResponse} from "../characters/character.ts";

export async function renderFilms(): Promise<string> {
  const filmsWithCharacters = await fetchFilmsWithCharacters();

  const allFilmHtmlEntries = filmsWithCharacters.map(film => {
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

  return allFilmHtmlEntries.join('\n');
}

async function fetchFilmsWithCharacters() {
  const filmPaginatedResponse = await jsonFetch<PaginatedResponse<FilmResponse>>(`${BASE_URL}/films`);

  const populatedFilmData: FilmData[] = [];

  for (const filmResponse of filmPaginatedResponse.results) {
    const characterPromises = filmResponse.characters.map(characterLink => {
      return jsonFetch<CharacterResponse>(characterLink)
    });

    const characters = await Promise.all(characterPromises);

    populatedFilmData.push({
      ...filmResponse,
      characterNames: characters.map(char => char.name),
    })
  }

  return populatedFilmData;
}