const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const PhotoSchema = new Schema({
  vet_id: { type: ObjectId, ref: 'Vet', required: true },
  image_url: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
});

module.exports = model('Photo', PhotoSchema)