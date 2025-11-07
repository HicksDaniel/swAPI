
export type UrlLink = `https://swapi.dev/api/${string}`;

export interface PaginatedResponse<T> {
  count: number;
  next: UrlLink | null;
  previous: UrlLink | null;
  results: T[];
}

export async function jsonFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

export const BASE_URL = "https://swapi.dev/api";

