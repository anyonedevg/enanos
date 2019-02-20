// requerimientos
const router = require('express').Router();
const { Comment } = require('../models');
const comment = require('../controllers/comment.controller');

// añadir comentario
router.post('/comments/add-comment/:vet_id', async (req, res) => {
  const { vet_id } = req.params;
  const { user_id, content } = req.body;
  const newComment = new Comment({
    vet_id: vet_id,
    user_id: user_id,
    content: content
  });
  const resultado = await newComment.save();
  // res.redirect('/vets');
  console.log('******INICIO*******');
  res.redirect(`/vets/${vet_id}`);
  console.log('******FIN*******');


});

module.exports = router;