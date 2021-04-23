import { ModelEntryWithSite } from "./models";
import { API_URL } from "./settings";

const apiUrl = API_URL;

async function fetchGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error();
  }
  return res.json();
}

export async function apiGetEntries(id: string): Promise<ModelEntryWithSite[]> {
  return await fetchGet(`${apiUrl}/_/${id}.json`);
}
