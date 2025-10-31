export interface FILMObject {
  title: string;
  episode_id: number;
  characters: string[];
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

const BASE_URL = "https://swapi.dev/api/";

export default async function apiFetch(): Promise<FILMObject[]> {
  let dataResults: FILMObject[] = [];

  const fetchSWAPI = async () => {
    const res = await fetch(`${BASE_URL}films/`);
    const data = await res.json();

    const filmsWithCharacters = await Promise.all(
      data.results.map(async (film: FILMObject) => {
        const characterNames = await Promise.all(
          film.characters.map(async (characterURL: string) => {
            const res2 = await fetch(characterURL);
            const characterData = await res2.json();
            return characterData.name;
          })
        );

        return {
          ...film,
          title: film.title,
          characters: characterNames,
        };
      })
    );

    return filmsWithCharacters;
  };

  dataResults = await fetchSWAPI();

  return dataResults;
}
