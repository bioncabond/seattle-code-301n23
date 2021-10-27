'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json()); //NEW LAB12
const mongoose = require('mongoose');
//Refactored our Schema and Model creation here
const EquipModel = require('./modules/equipment.js');
const seedData = require('./modules/seed.js');
const PORT = process.env.port || 3001;

mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) => res.status(200).send('Welcome to the server'));

app.get('/test', (req, res) => res.status(200).send('Test Complete'));
app.post('/test/:info', (req, res) => {
  console.log('\nQuery:', req.query, '\nParams:', req.params, '\nBody:', req.body);
  res.status(200).send('Posted!');
});

app.get('/seed', seedData);
app.get('/clear', bombTheBase);

app.get('/equip', getEquip);
app.post('/equip', postEquip); //NEW (1)
app.delete('/equip/:id', deleteEquip); //New(3)


app.get('*', (req, res) => {
  res.status(500).send('Route not found :(');
})
//Connect the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', () => console.log('mongo database is connected!'));

//Server is listening 
app.listen(PORT, () => { console.log('Listening on PORT:', PORT) });

//clear the database
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
//(2)
async function postEquip(req, res) {
  let postObj = req.body;
  console.log(postObj);
  //If the data is what you want, put into the database directly, if not going to massage.
  try {
    let postEntry = EquipModel(postObj);
    postEntry.save();
    res.status(200).send(postObj);
  }
  catch (err) {
    res.status(500).send('error posting: ', err.messaage);
  }
}

async function getEquip(req, res) {
  try {
    let filterQ = {};
    if (req.query.status) {
      let { status } = req.query;
      filterQ.status = status;
    }
    const item = await EquipModel.find(filterQ);
    res.status(200).send(item);
  }
  catch (error) {
    res.status(500).send('error retrieving equipment data:', error.message);
  }
}

async function deleteEquip(req, res) {
  let { id } = req.params;
  console.log(id);

  try {
    //delete the object
    let deletedObj = await EquipModel.findByIdAndDelete(id);
    res.status(200).send(deletedObj);
  }
  catch (err) {
    res.status(500).send('error deleting:', err.message);
  }
}
