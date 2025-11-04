import type { FILMObject, PLANETObject, CHARACTERObject } from "../interfaces.ts";

export const renderFilms = (film: FILMObject) => {
  return `<div class="film">
        <h3>${film.title}</h3>
        <p>Episode ${film.episode_id}</p>
        <p>Director: ${film.director}</p>
        <ul>
          <li>Characters:</li>
          ${film.characters.map((characterUrl) => `<li>${characterUrl}</li>`).join("")}
        </ul>
      </div>`;
};

export const renderPlanets = (planet: PLANETObject) => {
  return `<div class = "planet">
      <h3>${planet.name}</h3>
        <ul>
          <li>Characters:</li>
          ${planet.residents.map((characterUrl) => `<li>${characterUrl}</li>`).join("")}
        </ul>
        </div>`;
};

export const renderCharacters = (character: CHARACTERObject) => {
  return `<h3>${character.name}</h3>
      <h4>HomeWorld: ${character.homeworld}</h4>
        <ul>
          <li>Films:</li>
          ${character.films.map((filmName) => `<li>${filmName}</li>`).join("")}
        </ul>`;
};

