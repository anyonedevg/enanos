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
    console.log(vetsArray);
  }

  res.render('vet/vets', viewModel);
});


// see vet
router.get('/vets/:vet_id', async (req, res) => {
  let viewModel = { vet: {}, comments: {}, likes: Number };
  const { vet_id } = req.params;
  const vet = await Vet.findById(vet_id);
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

  res.render('vet/vet', viewModel);
});

module.exports = router;