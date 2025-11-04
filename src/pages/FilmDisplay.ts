import { apiFetch } from "../swFetch.ts";
import type { FILMObject, PLANETObject, CHARACTERObject } from "../interfaces.ts";

const BASE_URL = "https://swapi.dev/api/";

let planetCache: PLANETObject[] = [];
let filmsCache: FILMObject[] = [];
let characterCache: CHARACTERObject[] = [];

export const filmsDisplay = async (value: string) => {
  let films: FILMObject[];

  if (filmsCache.length > 0) {
    films = filmsCache;
  } else {
    films = (await apiFetch(`${BASE_URL}${value}/`)) as FILMObject[];
    filmsCache = films;
  }

  const filmsList = films
    .map(
      (film) =>
        `<div class="film">
        <h3>${film.title}</h3>
        <p>Episode ${film.episode_id}</p>
        <p>Director: ${film.director}</p>
        <ul>
          <li>Characters:</li>
          ${film.characters.map((characterUrl) => `<li>${characterUrl}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");

  document.querySelector("#films")!.innerHTML = filmsList;
};

export const planetsDisplay = async (value: string) => {
  let planets: PLANETObject[];

  if (planetCache.length > 0) {
    planets = planetCache;
  } else {
    planets = (await apiFetch(`${BASE_URL}${value}/`)) as PLANETObject[];
    planetCache = planets;
  }
  const planetsList = planets
    .map(
      (planet) =>
        `<h3>${planet.name}</h3>
        <ul>
          <li>Characters:</li>
          ${planet.residents.map((characterUrl) => `<li>${characterUrl}</li>`).join("")}
        </ul>`
    )
    .filter((html) => html.trim() !== "")
    .join("");

  document.querySelector("#planets")!.innerHTML = planetsList;
};
export const characterDisplay = async (value: string) => {
  let character: CHARACTERObject[];

  if (characterCache.length > 0) {
    character = characterCache;
  } else {
    character = (await apiFetch(`${BASE_URL}${value}/`)) as CHARACTERObject[];
    characterCache = character;
  }
  const characterList = character
    .map(
      (character) =>
        `<h3>${character.name}</h3>
      <h4>HomeWorld: ${character.homeworld}</h4>
        <ul>
          <li>Films:</li>
          ${character.films.map((filmName) => `<li>${filmName}</li>`).join("")}
        </ul>`
    )
    .filter((html) => html.trim() !== "")
    .join("");

  document.querySelector("#characters")!.innerHTML = characterList;
};
