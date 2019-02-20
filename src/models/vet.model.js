const { Schema, model } = require('mongoose');

const VetSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  district: { type: String, required: true }
});

module.exports = model('Vet', VetSchema)