const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000; // Choose a suitable port number

app.use('/', async (req, res) => {
  const url = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/76561198008049283`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'TRN-Api-Key': 'f8fd1723-c779-40ff-ab22-57f475b91fd0'
      }
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching CSGO profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});