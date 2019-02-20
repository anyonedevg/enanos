const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const CommentSchema = new Schema({
  vet_id: { type: ObjectId, ref: 'Vet', required: true },
  user_id: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('Comment', CommentSchema)