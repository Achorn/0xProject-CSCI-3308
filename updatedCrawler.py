from bs4 import BeautifulSoup
import requests
import xlwt
import re

wb = xlwt.Workbook()
ws = wb.add_sheet('A Test Sheet')

recipes = [];
row = 1;
col = 0;

mainURL = 'https://www.bonappetit.com/recipes'

response = requests.get(mainURL)
html = response.text
soup = BeautifulSoup(html)

for link in soup.findAll('a', attrs={'href': re.compile("^recipe/")}):
    if (link.get('href')) not in recipes:
      recipes = recipes + [(link.get('href'))]

for i in range(len(recipes)):
  url = 'https://www.bonappetit.com/' + (recipes[i])

  response = requests.get(url)
  html = response.text
  soup = BeautifulSoup(html)

  ingredients = soup.find_all('div', 'ingredients__text')
  title = soup.find('a', 'top-anchor')

  ws.write(0, col, title.text)

  for res in (ingredients):
     ws.write(row, col, res.text)
     row += 1
  row = 1;
  col += 1

wb.save('Recipes.xls')
