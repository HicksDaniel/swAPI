import { fetchHandler } from "./fetchHandler.ts";
import type { APIResponses, selectableCategory } from "./interfaces.ts";

const fetchCache: { [key: string]: APIResponses[] } = {};

export const populateData = async (category: selectableCategory, renderItem: (item: any) => string) => {
  let data;

  if (fetchCache[category]) {
    data = fetchCache[category];
  } else {
    data = await fetchHandler(category);
    fetchCache[category] = data;
  }
  const outputHTML = data
    .map(renderItem)
    .filter((html) => html.trim() !== "")
    .join("");

  document.querySelector(`#${category}`)!.innerHTML = outputHTML;
};
