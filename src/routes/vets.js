const router = require('express').Router();
const { Vet, Photo } = require('../models');


// ver veterinarias
router.get('/vets', async (req, res) => {
  let viewModel = { vets: {} };
  const vets = await Photo.find().populate('vet_id');
  if (vets) {
    viewModel.vets = vets;
  }

  res.render('vets', viewModel);
});


// ver veterinaria
router.get('/vets/:vet_id', async (req, res) => {
  let viewModel = { vets: {} };
  const { vet_id } = req.params;
  const vet = await Photo.find({ vet_id }).populate('vet_id');

  console.log(vet);

  res.render('vet', viewModel);
});

module.exports = router;