'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const PORT = process.env.port || 3001;

//Create a Collection called ghostSmashEquip

mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//app.get('/', (req, res) => res.status(200).send('Welcome to the server'));
app.get('/', (req, res) => {
  EquipModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
      res.status(200).send(item);
    }
  });
});
app.get('/seed', seed);
app.get('/clear', bombTheBase);
app.get('/find', findEntry);
app.get('*', (req, res) => {
  res.status(500).send('Route not found :(');
})
// assign the connection to a var
const db = mongoose.connection;
//if there is an error
db.on('error', console.error.bind(console, 'conection error: '));
//run once if connected
db.once('open', () => console.log('mongo database is connected!'));

app.listen(PORT, () => { console.log('Listening on PORT:', PORT) });

//Setup a schema which will shape the data that goes into the database
const equipSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  qty: { type: String },
  status: { type: String, uppercase: true, enum: ['WORKING', 'REPAIR', 'REPLACEMENT'] }
});

//Model -> Apply the schema to the collection

const EquipModel = mongoose.model('ghostSmashEquip', equipSchema);

// //Sample data entry
// const sampleEntry = new EquipModel({
//   name: 'Proton Pack',
//   description: 'Unlicensed Nuclear Accelerator',
//   qty: 4,
//   status: 'WORKING',
// });
// sampleEntry.save();

//Find All the entries in the database

EquipModel.find((err, item) => {
  if (err) return console.error(err);
  console.log(item);
});
//if you need to undo an ADD
// git reset <FILE>

//if you ever need to undo a commit that has NOT been pushed:
// git reset HEAD~1 --soft

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

//Seed the database
function seed(req, res) {
  //Sample data entry
  const seedArr = [
    { name: 'Proton Pack', description: 'Unlicensed Nuclear Accelerator', qty: 4, status: 'REPLACEMENT' },
    { name: 'Ghost Trap', description: 'Temp Ghost Containment', qty: 4, status: 'WORKING' },
    { name: 'PKE Meter', description: 'Ghost Detection', qty: 2, status: 'REPAIR' }
  ]
  seedArr.forEach(seed => {
    let entry = new EquipModel(seed);
    entry.save();
  });
  res.status(200).send('Seeded Database');
}

//filter to return only a matching criteria
async function findEntry(req, res) {
  if (req.query.status) {
    let { status } = req.query;
    let filterQ = {}
    filterQ.status = status;
    const item = await EquipModel.find(filterQ);
    res.status(200).send(item);
  }
  else {
    res.status(200).send([]);
  }
}
