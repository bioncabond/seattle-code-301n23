'use strict'

let cache = require('./modules/Cache.js');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const getRecipe = require('./modules/Recipe.js');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.port || 3001;

app.get('/', (req, res) => res.status(200).send('Welcome to the server'));
app.get('/recipies', getRecipe);
app.get('*', (req, res) => {
  res.status(500).send('Route not found :(');
})

app.listen(PORT, () => { console.log('Listening on PORT:', PORT) });
