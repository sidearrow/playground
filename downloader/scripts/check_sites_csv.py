import csv
import feedparser
from argparse import ArgumentParser
from dataclasses import dataclass
from urllib.request import Request, urlopen


@dataclass
class Options:
    input_file_path: str
    with_request: bool


def get_rss(url: str):
    req = Request(url)
    req.add_header("User-Agent", "Mozilla/5.0")
    with urlopen(req) as res:
        fp = feedparser.parse(res.read())
        title = fp["feed"]["title"]
        link = fp["feed"]["link"]
        return {"title": title, "url": link}


@dataclass
class CSVRow:
    site_id: str
    site_name: str
    site_url: str
    rss_url: str

    @staticmethod
    def from_list(lst):
        return CSVRow(
            site_id=lst[0],
            site_name=lst[1],
            site_url=lst[2],
            rss_url=lst[3],
        )

    def to_list(self):
        return [self.site_id, self.site_name, self.site_url, self.site_url]


def iter_csv(filepath: str):
    with open(filepath) as f:
        for row in csv.reader(f):
            yield CSVRow.from_list(row)


def main(options: Options):
    fpath = options.input_file_path
    outfpath = options.input_file_path + ".fix"

    csv_data = []
    for row in iter_csv(fpath):
        if options.with_request:
            res = get_rss(row.rss_url)
            # row.site_name = res["title"]
            # row.site_url = res["url"]
        csv_data.append(row.to_list())
    csv_data.sort(key=lambda v: v[1])

    with open(outfpath, "w") as f:
        csvw = csv.writer(f)
        csvw.writerows(csv_data)


if __name__ == "__main__":
    p = ArgumentParser()
    p.add_argument("--file", required=True)
    p.add_argument("--with-request", action="store_true")
    args = p.parse_args()

    options = Options(
        input_file_path=args.file,
        with_request=args.with_request,
    )
    main(options)