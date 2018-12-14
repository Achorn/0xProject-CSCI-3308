from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
import xlwt
import re
import time

driver = webdriver.Chrome(r"C:\Users\Aidan Anderson\PycharmProjects\RecipeGrabber\venv\Scripts\chromedriver.exe")

wb = xlwt.Workbook()
ws = wb.add_sheet('A Test Sheet')

recipes = [];
row = 2;
col = 0;
mainURL = 'https://www.bonappetit.com/recipes'

response = driver.get(mainURL)
html = driver.page_source


for x in range(40):
    time.sleep(2)
    more = driver.find_element_by_xpath("/html/body/div[4]/div/div/div[2]/div[1]/div/div/button")
    more.click()
    print(x)
soup = BeautifulSoup(driver.page_source)
for link in soup.findAll('a', attrs={'href': re.compile("^recipe/")}):
    if (link.get('href')) not in recipes:
      recipes = recipes + [(link.get('href'))]

for i in range(len(recipes)):
  url = 'https://www.bonappetit.com/' + (recipes[i])

  response = driver.get(url)
  html = driver.page_source
  soup = BeautifulSoup(html)

  ingredients = soup.find_all('div', 'ingredients__text')
  title = soup.find('a', 'top-anchor')
  print(title)
  ws.write(0, col, title.text)
  ws.write(1, col, url)

  for res in (ingredients):
     ws.write(row, col, res.text)
     row += 1
  row = 2;
  col += 1
wb.save('C:\Users\Aidan Anderson\Documents\Recipes.xls')
