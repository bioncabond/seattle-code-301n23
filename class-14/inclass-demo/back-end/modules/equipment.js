'use strict'

const mongoose = require('mongoose');

//Setup a schema which will shape the data that goes into the database
const equipSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  qty: { type: String },
  status: { type: String, uppercase: true, enum: ['WORKING', 'REPAIR', 'REPLACEMENT'] }
});

const EquipModel = mongoose.model('ghostSmashEquip', equipSchema);

module.exports = EquipModel;