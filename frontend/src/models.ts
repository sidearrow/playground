export type Entry = {
  title: string;
  url: string;
  updated: string;
};

export type Site = {
  id: string;
  title: string;
  url: string;
  entry_num: number;
};

export type SiteEntries = {
  title: string;
  url: string;
  entries: Entry[];
};

export type SiteInfo = {
  id: string;
} & SiteEntries;
