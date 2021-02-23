const fs = require("fs");
const path = require("path");

const OUT_DIR = path.resolve(path.join(__dirname, "./out"));
const BASE_URL = "https://hit-u-badminton.web.app";
const LAST_MOD = new Date().toISOString().split("T")[0];

const TEMPLATE_XML = (urlNodes) =>
  `
<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${urlNodes}
</urlset>
`.trim();

const TEMPLATE_URL_NODE = (loc, lastmod) =>
  `
<url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
</url>
`.trim();

const listPaths = (dir) => {
  if (dir === path.join(OUT_DIR, "_next")) {
    return [];
  }
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    if (dirent.isDirectory()) {
      return listPaths(`${dir}/${dirent.name}`);
    }
    if (dirent.isFile()) {
      if (dirent.name.slice(-5) !== ".html") {
        return [];
      }
      const filename =
        dirent.name.slice(-10) === "index.html" ? "" : dirent.name.slice(0, -5);
      return [`${dir}/${filename}`.replace(OUT_DIR + "/", "")];
    }
    return [];
  });
};

const paths = listPaths(OUT_DIR);
const urlNodes = paths
  .map((path) => TEMPLATE_URL_NODE(`${BASE_URL}/${path}`, LAST_MOD))
  .join("\n");
const xml = TEMPLATE_XML(urlNodes);

fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), xml);

console.log("Success to generate sitemap.xml.");
