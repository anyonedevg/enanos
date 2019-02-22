const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const LikeSchema = new Schema({
  vet_id: { type: ObjectId, ref: 'Vet', required: true },
  user_id: { type: ObjectId, ref: 'User', required: true },
});

module.exports = model('Like', LikeSchema)