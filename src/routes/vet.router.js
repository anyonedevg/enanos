// requeriments
const router = require('express').Router();
const { Vet, Comment, Photo } = require('../models');


// ver veterinarias
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

  console.log(arregloFinal)
  console.log(arregloFinal[0].vets)

  res.render('vet/vets', viewModel);
});


// ver veterinaria
router.get('/vets/:vet_id', async (req, res) => {
  let viewModel = { vet: {}, comments: {} };
  const { vet_id } = req.params;
  const vet = await Photo.findOne({ vet_id }).populate('vet_id');
  const comments = await Comment.find({ vet_id: vet_id }).populate('user_id').sort({ timestamp: -1 });
  console.log('*****************');
  console.log(comments);
  console.log('*****************');
  if (vet) {
    viewModel.vet = vet;
    // console.log(vet);
    // console.log(viewModel);
  }
  if (comments) {
    viewModel.comments = comments;
  }

  res.render('vet/vet', viewModel);
});

module.exports = router;