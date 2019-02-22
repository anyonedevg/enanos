// requeriments
const router = require('express').Router();
const { Like, Vet, Comment, Photo } = require('../models');


// see vets
router.get('/vets', async (req, res) => {
  let viewModel = { vets: {}, distritos: {} };
  let arregloFinal = [];

  const districtsDB = await Vet.distinct('district');
  for (let distrito of districtsDB) {
    try {

      let arregloAux = [];

      let objeto = {
        "distrito": distrito,
        "vets": []
      }

      const vets = await Photo.find().populate({
        path: 'vet_id',
        match: { district: distrito }
      });
      for (const vet of vets) {
        if (vet.vet_id) {
          arregloAux.push(vet);
        }
      }

      objeto.vets = arregloAux;

      arregloFinal.push(objeto)
    } catch (error) {
      console.log(error)
    }
  }
  viewModel.distritos = arregloFinal;

  res.render('vet/vets', viewModel);
});


// see vet
router.get('/vets/:vet_id', async (req, res) => {
  let viewModel = { vet: {}, comments: {}, like: {} };
  const { vet_id } = req.params;
  const vetViews = await Vet.findById(vet_id);
  vetViews.views = vetViews.views + 1;
  await vetViews.save();

  const vet = await Photo.findOne({ vet_id }).populate('vet_id');
  const comments = await Comment.find({ vet_id: vet_id }).populate('user_id').sort({ timestamp: -1 });

  if (req.user) {
    const { _id } = req.user;
    console.log('ID', _id);

    const like = await Like.find({ vet_id: vet_id, user_id: _id });
    if (like) {
      console.log('LIKE', like);
      viewModel.like = like;
    }

  }
  if (vet) {
    viewModel.vet = vet;
  }
  if (comments) {
    viewModel.comments = comments;
  }

  res.render('vet/vet', viewModel);
});

module.exports = router;