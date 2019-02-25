const { Schema, model } = require('mongoose');

const VetSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  image_url: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  views: { type: Number, default: 0 },
});

module.exports = model('Vet', VetSchema)