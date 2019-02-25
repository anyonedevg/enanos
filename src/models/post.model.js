const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image_url: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model('Post', PostSchema)