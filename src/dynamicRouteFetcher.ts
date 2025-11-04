import type { APIResponses } from "./interfaces.ts";
import { CharactersFromFilm, CharactersFromPlanet, CharacterData } from "./fetchRequests.ts";

export const dynamicRouteFetcher = async (category: APIResponses | APIResponses[]) => {
  /// THIS IS AN AWFUL WAY TO CHECK, BUT IT WORKS IN THIS EXAMPLE ///

  if ("characters" in category) {
    return await CharactersFromFilm(category);
  } else if ("residents" in category) {
    return await CharactersFromPlanet(category);
  } else if ("films" in category) {
    return await CharacterData(category);
  }
};
