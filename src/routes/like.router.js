const router = require('express').Router();
const { Like, User, Vet } = require('../models');


// add like
router.post('/likes/:vet_id', async (req, res) => {
  const { vet_id } = req.params;
  const { _id } = req.user;

  if (_id) {
    const newLike = new Like({
      vet_id: vet_id,
      user_id: _id
    });
    await newLike.save();
  }

  res.redirect(`/vets/${vet_id}`);
});

module.exports = router;