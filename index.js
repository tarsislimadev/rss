// npm install --save rss-parser

const readme_url = 'https://raw.githubusercontent.com/tarsislimadev/rss/refs/heads/main/README.md'

const Parser = require('rss-parser')

const parseISOString = (date = (new Date).toISOString()) => date.split('T').at(0)

const getReadMeText = () => fetch(readme_url).then((res) => res.text())

const parseRssItem = (item) => console.log('RSS feed', item.title, parseISOString(item.isoDate))

const parseRssFeed = (url) => (new Parser()).parseURL(url)
  .then((res) => res.items.map((item) => parseRssItem(item)))

const state = { urls: null }

getReadMeText()
  .then((text) => state.urls = text.split('\n').slice(1).filter(Boolean))
  .then(() => state.urls.map((url) => parseRssFeed(url)))
  .catch((err) => console.error(err))
