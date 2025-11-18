export type UrlLink = `https://swapi.dev/api/${string}`;

export interface PaginatedResponse<T> {
  count: number;
  next: UrlLink | null;
  previous: UrlLink | null;
  results: T[];
}

export async function jsonFetch<T>(url: string, auth0Client: any): Promise<T> {
  const user = await auth0Client.getUser();

  const accessToken = await auth0Client.getTokenSilently();

  const response = await fetch(
    `http://localhost:3000/api/category-search?url=${url}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
}

export const BASE_URL = "https://swapi.dev/api";
