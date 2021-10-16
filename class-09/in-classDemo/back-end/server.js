'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001
const axios = require('axios');

require('dotenv').config();
//Bring in module
let handlePokemon = require('./modules/pokemon.js')
let errorHandler = require('./modules/error.js')


app.get('/', (request, response) => response.status(200).send('Welcome the the Root!'));
app.get('/pokemon', handlePokemon);
app.get('*', errorHandler);



app.listen(PORT, () => { console.log('Listening on', PORT) });

//moved pokemon function to module
