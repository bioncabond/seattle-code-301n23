'use strict'
require('dotenv').config();
//#region Mongodb Connections and app require
const mongoose = require('mongoose');
//Refactored our Schema and Model creation here
const EquipModel = require('./modules/equipment.js');
const PORT = process.env.port || 3001;

mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//Changed: Modularized all the routes, except equip
const app = require('./modules/routes.js')
//#endregion
//JWKS STUFF

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

var client = jwksClient({
  //jwksUri: Account specific:  settings -> advanced settings -> endpoint -> JSON Web Key Set
  jwksUri: 'https://dev-axb-g8vc.us.auth0.com/.well-known/jwks.json'
});
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}



app.get('/', (req, res) => res.status(200).send('Welcome to the server'));

app.get('/equip', getEquip);
app.post('/equip', postEquip);
app.put('/equip/:id', putEquip)
app.delete('/equip/:id', deleteEquip);

app.get('*', (req, res) => {
  res.status(500).send('Route not found :(');
})
//Connect the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', () => console.log('mongo database is connected!'));

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
    //JWKS
    const item = await EquipModel.find(filterQ);
    let token = '';
    if (!req.headers.authorization) token = '';
    else {
      token = req.headers.authorization.split([' '])[1];
    }

    jwt.verify(token, getKey, {}, function (err, user) {
      if (err) res.status(500).send(`Invalid Token: ${err.message}`);
      else {
        res.status(200).send(item);
      }
    })

  }
  catch (error) {
    res.status(500).send(`error retrieving equipment data:${error.message}`);
  }
}
async function putEquip(req, res) {
  console.log('\nParams:', req.params, '\nBody:', req.body)
  //let {name, description, qty, status} = req.body
  let putObj = req.body;
  let id = req.params.id;
  try {
    const updatedObj = await EquipModel.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
    res.status(200).send(updatedObj);
  }
  catch (e) {
    console.log(e.message);
    res.status(500).send(`Unable to PUT object: ${e.message}`);
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
