import urllib
import requests
from bs4 import BeautifulSoup

BASE_URL = 'https://ja.wikipedia.org'


def get_list_html():
    res = requests.get(BASE_URL + urllib.parse.quote('/wiki/日本の鉄道駅一覧'))
    open('./list.html', mode='w').write(res.text)


def get_list():
    html = open('./list.html').read()
    bs = BeautifulSoup(html, 'html.parser')
    link_list = bs.select('td > a')

    res = []
    for link in link_list:
        title = link.get('title')
        href = link.get('href')
        if '日本の鉄道駅一覧' in title:
            res.append(href)

    return res


link_list = get_list()
print(link_list)
