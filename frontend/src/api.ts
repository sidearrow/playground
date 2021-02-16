import { Entry } from "./models";

async function fetchGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error();
  }
  return res.json();
}

export async function apiGetSite(siteId: string): Promise<Entry[]> {
  return await fetchGet(`http://localhost:9999/latest/${siteId}.json`);
}

export async function apiGetSites() {
  return await fetchGet("http://localhost:9999/latest/sites");
}
