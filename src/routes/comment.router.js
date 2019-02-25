// requeriments
const router = require('express').Router();
const { Comment } = require('../models');
const comment = require('../controllers/comment.controller');

// add comment
router.post('/comments/add-comment/:vet_id', async (req, res) => {
  const { vet_id } = req.params;
  const { content } = req.body;
  const { _id } = req.user;

  if (_id) {
    const newComment = new Comment({
      vet_id: vet_id,
      user_id: _id,
      content: content
    });
    await newComment.save();
  }

  res.redirect(`/vets/${vet_id}`);

});

module.exports = router;