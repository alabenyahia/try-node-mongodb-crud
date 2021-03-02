const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: 'This field is required'
   },
   nationality: {
      type: String,
      required: 'This field is required'
   },
   age: {
      type: Number,
      required: 'This field is required'
   }
});

const playerModel = mongoose.model('player', playerSchema);

module.exports = playerModel;

