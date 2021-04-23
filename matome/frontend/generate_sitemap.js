const fs = require("fs");
const path = require("path");

const OUT_DIR = path.resolve(path.join(__dirname, "./out"));
const BASE_URL = "https://matometane.web.app";

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
const sitemapTxt = paths.map((path) => `${BASE_URL}/${path}`).join("\n");
fs.writeFileSync(path.join(OUT_DIR, "sitemap.txt"), sitemapTxt);

console.log("Success to generate sitemap.xml.");
