import { ModelEntries, ModelSites } from "./models";

//const apiUrl = "http://localhost:9999";
const apiUrl = "https://ss1.xrea.com/matometane.s205.xrea.com/content";

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

export async function apiGetSites(): Promise<ModelSites> {
  return await fetchGet(`${apiUrl}/sites.json`);
}
