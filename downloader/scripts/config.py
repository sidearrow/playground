import json

download_list = json.load(open("./download_list.json"))

res = []
for site in download_list["sites"]:
    res.append(
        {
            "site_id": site["site_id"],
            "site_url": site["site_url"],
            "site_name": site["site_name"],
        }
    )

json.dump(res, open("./sites.json", "w"), ensure_ascii=False)