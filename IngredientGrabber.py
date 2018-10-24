from bs4 import BeautifulSoup
import requests
import re

url = input('Enter Website')

response = requests.get(url)
html = response.text
soup = BeautifulSoup(html)

ingredients = soup.find_all('div', 'ingredients__text')

for res in ingredients:
    print (res.text)