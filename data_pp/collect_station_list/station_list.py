import urllib
import requests

BASE_URL = 'https://ja.wikipedia.org/wiki/'

url = BASE_URL + urllib.parse.quote('日本の鉄道駅一覧')

res = requests.get(url)

print(res.text)
