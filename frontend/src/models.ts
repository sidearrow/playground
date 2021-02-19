export type ModelSite = {
  siteId: string;
  siteName: string;
  siteUrl: string;
};

export type ModelSites = ModelSite[];

export type ModelEntries = {
  site: ModelSite;
  entries: {
    title: string;
    url: string;
    updated: string;
  }[];
};
