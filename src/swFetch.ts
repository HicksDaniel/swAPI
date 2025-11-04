import type { FilmsResponse, APIResponses } from "./interfaces.ts";
import { dynamicRouteFetcher } from "./dynamicRouteFetcher.ts";

export async function apiFetch(fetchRequest: string): Promise<APIResponses[]> {
  console.log(fetchRequest);
  const res = await fetch(fetchRequest);
  const data = (await res.json()) as FilmsResponse;

  const returnedData: APIResponses[] = [];

  //// Originaly was going to handle multiple calls and a single call ////

  if ("results" in data) {
    for (const objects of data.results as APIResponses[]) {
      console.log(objects);
      let results = await dynamicRouteFetcher(objects);
      returnedData.push(results as APIResponses);
    }
  } else {
    let results = await dynamicRouteFetcher(data as APIResponses);
    returnedData.push(results as APIResponses);
  }

  return returnedData;
}
