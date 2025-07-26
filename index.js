const express = require('express');
const path = require('path');
const { findCar, getLogo } = require('./workers');

const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/:query', async (req, res) => {
  const query = req.params.query;
  const results = await findCar(query);
  res.json(results);
});

app.get('/logo/:brand', async (req, res) => {
    const brand = req.params.brand;
    const logoUrl = await getLogo(brand);
    if (logoUrl) {
        res.redirect(logoUrl);
    } else {
        res.status(404).send('Logo not found');
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});