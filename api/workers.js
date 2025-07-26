const axios = require('axios');
const cheerio = require('cheerio');
const Fuse = require('fuse.js');

const carData = require('./dist/api/index.json');
const allModels = require('./dist/api/all.json');

const fuse = new Fuse(allModels, {
  keys: ['brand', 'model'],
  includeScore: true,
});

async function findCar(query) {
  const results = fuse.search(query);
  return results.map(result => result.item);
}

async function getLogo(brand) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/index.php?search=logo+${brand}&title=Special:MediaSearch&go=Go&type=image`;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const firstResult = $('.sd-file-results > div:first-child .sd-file-result__filename a').attr('href');
    if (firstResult) {
      const imageUrl = `https://commons.wikimedia.org${firstResult}`;
      const imagePage = await axios.get(imageUrl);
      const $$ = cheerio.load(imagePage.data);
      const logoUrl = $$('div.fullImageLink a').attr('href');
      return logoUrl;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  findCar,
  getLogo,
};