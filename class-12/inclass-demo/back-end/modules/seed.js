'use strict'
const EquipModel = require('./equipment.js');
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

module.exports = seed;