import type { CHARACTERObject, FILMObject, PLANETObject } from "./interfaces.ts";

export const CharactersFromFilm = async (category: FILMObject) => {
  console.log("charactersFromFilm", category);
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
  console.log("charactersFromPlanet", category);
  const characterPromises = category.residents.map((charUrl: string) => fetch(charUrl));
  const characterResponses = await Promise.all(characterPromises);

  const charJsonPromises = characterResponses.map((charRes) => charRes.json());
  const characterData = await Promise.all(charJsonPromises);

  return {
    ...category,
    residents: characterData.map((char) => char.name),
  };
};

export const CharacterData = async (category: CHARACTERObject) => {
  console.log("characterData", category);
  const filmPromises = category.films.map((filmUrl: string) => fetch(filmUrl));
  const filmResponses = await Promise.all(filmPromises);

  const homeworldRes = await fetch(category.homeworld);
  const homeworld = await homeworldRes.json();

  const filmJsonPromises = filmResponses.map((filmRes) => filmRes.json());
  const filmData = await Promise.all(filmJsonPromises);

  return {
    ...category,
    homeworld: homeworld.name,
    films: filmData.map((film) => film.title),
  };
};
