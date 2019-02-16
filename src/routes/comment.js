const router = require('express').Router();

const comment = require('../controllers/comment');

router.post('/comments/add-comment/:vet_id', (req, res) => {
  console.log(req.params.vet_id);
  console.log(req.body.content);
  console.log(req.body.user_id);
  res.render('vet/vets');
});

module.exports = router;