import csv
from collections import Counter


def get_duplicate(l: list):
    return [k for k, v in Counter(l).items() if v > 1]


csv_r = csv.reader(open("./download_list.csv"))
site_ids = [v[0] for v in csv_r]

dup_site_ids = get_duplicate(site_ids)
print(dup_site_ids)