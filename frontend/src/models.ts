export type ModelSite = {
  siteId: string;
  siteName: string;
  siteUrl: string;
};

export type ModelSites = ModelSite[];

export type ModelEntry = {
  title: string;
  url: string;
  updated: string;
};

export type ModelEntries = {
  site: ModelSite;
  entries: ModelEntry[];
};

export type ModelEntryWithSite = {
  site: ModelSite;
  entry: ModelEntry;
};
