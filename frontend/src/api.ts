import { ModelEntries, ModelSites } from "./models";

const apiUrl = "http://localhost:9999";
//const apiUrl = "https://matome-public.s3-ap-northeast-1.amazonaws.com";

async function fetchGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error();
  }
  return res.json();
}

export async function apiGetEntries(siteId: string): Promise<ModelEntries> {
  return await fetchGet(`${apiUrl}/latest/_/${siteId}`);
}

export async function apiGetSites(): Promise<ModelSites> {
  return await fetchGet(`${apiUrl}/latest/sites`);
}
