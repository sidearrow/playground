import { ModelEntries, ModelEntry, ModelSite } from "./models";
import { API_URL } from "./settings";

const apiUrl = API_URL;

async function fetchGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error();
  }
  return res.json();
}

export async function apiGetEntries(siteId: string): Promise<ModelEntries> {
  return await fetchGet(`${apiUrl}/_/${siteId}.json`);
}

export async function apiGetEntriesAll(): Promise<
  { site: ModelSite; entry: ModelEntry }[]
> {
  return await fetchGet(`${apiUrl}/_/_latest.json`);
}
