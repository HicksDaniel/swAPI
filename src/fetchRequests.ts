import type { CHARACTERObject, FILMObject, PLANETObject } from "./interfaces.ts";

export const CharactersFromFilm = async (category: FILMObject) => {
  const characterPromises = category.characters.map((charUrl: string) => fetch(charUrl));
  const characterResponses = await Promise.all(characterPromises);

  const charJsonPromises = characterResponses.map((charRes) => charRes.json());
  const characterData = await Promise.all(charJsonPromises);

  return {
    ...category,
    characters: characterData.map((char) => char.name),
  };
};

export const CharactersFromPlanet = async (category: PLANETObject) => {
  const characterPromises = category.residents.map((charUrl: string) => fetch(charUrl));
  const characterResponses = await Promise.all(characterPromises);

  const charJsonPromises = characterResponses.map((charRes) => charRes.json());
  const CharacterData = await Promise.all(charJsonPromises);

  return {
    ...category,
    residents: CharacterData.map((char) => char.name),
  };
};

export const CharacterData = async (category: CHARACTERObject) => {
  const filmPromises = category.films.map((charUrl: string) => fetch(charUrl));
  const filmResponses = await Promise.all(filmPromises);

  const homeworldRes = await fetch(category.homeworld);
  const homeworld = await homeworldRes.json();

  const charJsonPromises = filmResponses.map((charRes) => charRes.json());
  const CharacterData = await Promise.all(charJsonPromises);

  return {
    ...category,
    homeworld: homeworld.name,
    films: CharacterData.map((film) => film.title),
  };
};
