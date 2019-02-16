const router = require('express').Router();
const { Vet, Photo } = require('../models');


// ver veterinarias
router.get('/vets', async (req, res) => {
  let viewModel = { vets: {} };
  const vets = await Photo.find().populate('vet_id');
  if (vets) {
    viewModel.vets = vets;
  }

  res.render('vet/vets', viewModel);
});


// ver veterinaria
router.get('/vets/:vet_id', async (req, res) => {
  let viewModel = { vet: {} };
  const { vet_id } = req.params;
  const vet = await Photo.findOne({ vet_id }).populate('vet_id');
  if (vet) {
    viewModel.vet = vet;
    console.log(vet);
    console.log(viewModel);
  }

  res.render('vet/vet', viewModel);
});

module.exports = router;