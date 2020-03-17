import csv
import glob
import urllib
import re
import requests
import time
from bs4 import BeautifulSoup

BASE_URL = 'https://ja.wikipedia.org'

F_LINKS_CSV = './files/links.csv'


def get_list_html():
    res = requests.get(BASE_URL + urllib.parse.quote('/wiki/日本の鉄道駅一覧'))
    open('./list.html', mode='w').write(res.text)


def get_list():
    html = open('./files/list.html').read()
    bs = BeautifulSoup(html, 'html.parser')
    link_list = bs.select('td > a')

    res = []
    for link in link_list:
        title = link.get('title')
        href = link.get('href')
        if '日本の鉄道駅一覧' in title:
            res.append(href)

    return res


def create_links_csv():
    links = get_list()


def get_html(url):
    time.sleep(5)
    print('[INFO] sleep 5s ...')
    return requests.get(url).text


class Index():
    @staticmethod
    def create(links: list):
        for link in links:
            csv_w = csv.writer(open(F_LINKS_CSV, mode='w'))
            for link in links:
                csv_w.writerow([link])

    @staticmethod
    def get() -> list:
        csv_r = csv.reader(open(F_LINKS_CSV))
        res = []
        for rows in csv_r:
            res.append(rows[0])
        return res

    @staticmethod
    def save_html():
        links = Index.get()
        for i, link in enumerate(links):
            html = get_html(BASE_URL + link)
            open('station_list_{}.html'.format(i), mode='w').write(html)


def parse_station_list_html():
    files = glob.glob('./files/station_list/*')
    csv_w = csv.writer(open('./files/station.csv', mode='w'))
    for i, file_name in enumerate(files):
        html = open(file_name).read()
        bs = BeautifulSoup(html, 'html.parser')
        lis = bs.select('li')
        for li in lis:
            link = li.select_one('li > a')
            if link == None:
                continue
            title = link.get('title')
            if title == None:
                continue
            text = link.text
            if re.match(r'(.*)(駅|停留場)(|.*\(.*\))$', title):
                name =re.findall('(.*)(駅|停留場)(|.*\(.*\))$', title)[0][0]
                furigana = re.findall('.*（(.*)(えき|ていりゅうじょう).*）$', li.text)
                furigana = '' if len(furigana) == 0 else furigana[0][0]
                csv_w.writerow([name, title, furigana])
            else :
                print(title)


parse_station_list_html()
