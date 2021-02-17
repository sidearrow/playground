import { SiteEntries } from "./models";

async function fetchGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error();
  }
  return res.json();
}

export async function apiGetSite(siteId: string): Promise<SiteEntries> {
  return await fetchGet(`http://localhost:9999/latest/_/${siteId}`);
}

export async function apiGetSites() {
  return await fetchGet("http://localhost:9999/latest/sites");
}
