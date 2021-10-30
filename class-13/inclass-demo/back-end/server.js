'use strict'
require('dotenv').config();

const mongoose = require('mongoose');
//Refactored our Schema and Model creation here
const EquipModel = require('./modules/equipment.js');
const PORT = process.env.port || 3001;

mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//Changed: Modularized all the routes, except equip
const app = require('./modules/routes.js')
///BoilerPlate

app.get('/', (req, res) => res.status(200).send('Welcome to the server'));

app.get('/equip', getEquip);
app.post('/equip', postEquip);
app.delete('/equip/:id', deleteEquip);
app.put('/equip/:id', putEquip); //NEW

app.get('*', (req, res) => {
  res.status(500).send('Route not found :(');
})
//#region
//Connect the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', () => console.log('mongo database is connected!'));

//#endregion

//Server is listening 
app.listen(PORT, () => { console.log('Listening on PORT:', PORT) });

//CRUD Call Back Functions
//C
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
//R
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
//D
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
//U
async function putEquip(req, res) {
  let putObj = req.body;
  console.log('putBody:', putObj);
  let id = req.params.id;
  console.log('putParam:', id);
  try {
    const updatedObj = await EquipModel.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
    console.log(updatedObj);
    res.status(200).send(updatedObj);
  }
  catch (err) {
    res.status(500).send(`Unable to perform PUT: ${err.message}`);
  }
}

