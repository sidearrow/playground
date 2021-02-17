export type ModelSite = {
  siteId: string;
  siteName: string;
  siteUrl: string;
  entryNum: number;
};

export type ModelSites = ModelSite[];

export type ModelEntries = {
  site: {
    siteId: string;
    siteName: string;
    siteUrl: string;
  };
  entries: {
    title: string;
    url: string;
    updated: string;
  }[];
};
