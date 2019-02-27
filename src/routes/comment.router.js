// requeriments
const router = require('express').Router();
const { VetComment, PostComment } = require('../models');

// add vet comment
router.post('/comments/add-vet-comment/:vet_id', async (req, res) => {
  const { vet_id } = req.params;
  const { content } = req.body;
  const { _id } = req.user;

  if (_id) {
    const newVetComment = new VetComment({
      vet_id: vet_id,
      user_id: _id,
      content: content
    });
    await newVetComment.save();
  }

  res.redirect(`/vets/${vet_id}`);

});

// add post comment
router.post('/comments/add-post-comment/:post_id', async (req, res) => {
  const { post_id } = req.params;
  const { content } = req.body;
  const { _id } = req.user;

  if (_id) {
    const newPostComment = new PostComment({
      post_id: post_id,
      user_id: _id,
      content: content
    });
    await newPostComment.save();
  }

  res.redirect('/');
});


module.exports = router;