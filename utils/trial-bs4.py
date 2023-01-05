import requests
from bs4 import BeautifulSoup
import os
import sys

# URL = 'https://en.wikipedia.org/wiki/Python_(programming_language)'
URL = 'https://www.youtube.com/watch?v=gRLHr664tXA'

html = requests.get(URL).text
document = BeautifulSoup(html, 'html.parser')

# ul = document.find('ul', class_='image-carousel__item-list')

prices = document.find('div')

print(prices.prettify())

# try:
#     html = requests.get(URL).text
#     document = bs4.BeautifulSoup(html, 'html.parser')
#     table = document.find('table', class_='infobox vevent')
#     python_url = table.find('th', text='Website').next_sibling.a['href']
#     version = table.find(
#         'th', text='Stable release').next_sibling.strings.__next__()
#     logo_url = table.find('img')['src']
#     logo = requests.get(f'https:{logo_url}').content
#     filename = os.path.basename(logo_url)
#     with open(filename, 'wb') as file:
#         file.write(logo)
#     print(f'{python_url}, {version}, file://{os.path.abspath(filename)}')
# except requests.exceptions.ConnectionError:
#     print("You've got problems with connection.", file=sys.stderr)
