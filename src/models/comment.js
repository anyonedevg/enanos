const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const CommentSchema = new Schema({
  vet_id: { type: ObjectId, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  gravatar: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('Comment', CommentSchema)