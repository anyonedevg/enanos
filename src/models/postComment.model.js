const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const postCommentSchema = new Schema({
  post_id: { type: ObjectId, ref: 'Post', required: true },
  user_id: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('postComment', postCommentSchema)