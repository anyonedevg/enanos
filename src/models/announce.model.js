const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const AnnounceSchema = new Schema({
  user_id: { type: ObjectId, ref: 'User', required: true },
  pet_name: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  image_url: { type: String, required: true },
  last_date: { type: Date, required: true },
  last_location: { type: String, required: true },
  details: { type: String, required: true },
  contact_number: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('Anounce', AnnounceSchema);



