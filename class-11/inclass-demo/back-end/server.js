'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.port || 3001;

app.get('/', (req, res) => res.status(200).send('Welcome to the server'));
app.get('*', (req, res) => {
  res.status(500).send('Route not found :(');
})

app.listen(PORT, () => { console.log('Listening on PORT:', PORT) });
