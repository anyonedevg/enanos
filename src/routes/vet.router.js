// requeriments
const router = require('express').Router();
const { Like, Vet, VetComment } = require('../models');


// see vets
router.get('/vets', async (req, res) => {
  let viewModel = { distritos: {} };
  let vetsArray = [];

  const distritos = await Vet.find().distinct('district');
  distritos.sort();
  if (distritos) {
    for (let distrito of distritos) {
      let objeto = {
        distrito: distrito,
        vets: []
      }
      const vets = await Vet.find({ district: distrito });
      objeto.vets = vets;

      vetsArray.push(objeto);
    }
    viewModel.distritos = vetsArray;
  }

  res.render('vet/vets', viewModel);
});


// see vet
router.get('/vets/:vet_id', async (req, res) => {
  let viewModel = { vet: {}, comments: {}, like: {}, likes: Number };
  const { vet_id } = req.params;
  const vet = await Vet.findById(vet_id);
  vet.views++;
  await vet.save();

  if (vet) {
    viewModel.vet = vet;
  }
  const comments = await VetComment.find({ vet_id: vet_id }).populate('user_id').sort({ timestamp: -1 });
  if (comments) {
    viewModel.comments = comments;
  }
  let likes = await Like.find({ vet_id: vet_id }).countDocuments();
  if (!likes) {
    likes = 0
  }
  viewModel.likes = likes;

  if (req.user) {
    const { _id } = req.user;
    const like = await Like.find({ vet_id: vet_id, user_id: _id });
    if (like.length > 0) {
      viewModel.like = like;
    }
  }
  res.render('vet/vet', viewModel);
});

module.exports = router;