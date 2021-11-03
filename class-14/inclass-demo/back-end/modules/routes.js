'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
const seedData = require('./seed');


app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => res.status(200).send('Test Complete'));
app.post('/test/:info', (req, res) => {
  console.log('\nQuery:', req.query, '\nParams:', req.params, '\nBody:', req.body);
  res.status(200).send('Posted!');
});

app.get('/seed', seedData);
app.get('/clear', bombTheBase);

async function bombTheBase(req, res) {
  try {
    await EquipModel.deleteMany({});
    console.log('Database cleared')
      ;
    res.status(200).send('cleared');
  }
  catch (e) {
    console.log('error:', e.message);
  }
}

module.exports = app;