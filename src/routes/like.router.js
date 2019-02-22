const router = require('express').Router();
const { Like, User, Vet } = require('../models');


// add like
router.post('/likes/:vet_id', async (req, res) => {
  const { user_id } = req.body;
  const { vet_id } = req.params;
  const newLike = new Like({
    vet_id: vet_id,
    user_id: user_id
  });
  await newLike.save();
  res.redirect('/vets');
});

module.exports = router;