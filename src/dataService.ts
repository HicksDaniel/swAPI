import { apiFetch } from "./swFetch.ts";
import type { APIResponses } from "./interfaces.ts";

const BASE_URL = "https://swapi.dev/api/";

const fetchCache: { [key: string]: APIResponses[] } = {};

export const populateData = async <T extends APIResponses>(
  category: string,
  elementId: string,
  renderItem: (item: T) => string
) => {
  let data: T[];

  if (fetchCache[category]) {
    data = fetchCache[category] as T[];
  } else {
    data = (await apiFetch(`${BASE_URL}${category}/`)) as T[];
    fetchCache[category] = data;
  }
  const outputHTML = data
    .map(renderItem)
    .filter((html) => html.trim() !== "")
    .join("");

  document.querySelector(`#${elementId}`)!.innerHTML = outputHTML;
};
