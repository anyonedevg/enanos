const fs = require('fs-extra');
const router = require('express').Router();

// models
const { Vet, Photo } = require('../models');

// cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dmvfwlcaq',
  api_key: '163943565357421',
  api_secret: '3zG4Eeyh53w-BIMzn2-H-Z94Jq8'
});

// añadir veterinaria
router.get('/admin/add-vet', (req, res) => {
  res.render('admin/add-vet');
});

router.post('/admin/add-vet', async (req, res) => {
  try {
    const cloudinaryResult = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    const newVet = new Vet({
      name: req.body.name,
      address: req.body.address
    });
    const newVetResult = await newVet.save();

    const newPhoto = new Photo({
      vet_id: newVetResult._id,
      cloudinary_id: cloudinaryResult.public_id,
      image_url: cloudinaryResult.secure_url
    });
    await newPhoto.save();

  } catch (e) {
    console.log(e);
  }
  res.redirect('/admin/vets');

});

// ver veterinarias
router.get('/admin/vets', async (req, res) => {
  let viewModel = { vets: {} };
  const vets = await Photo.find().populate('vet_id');
  if (vets) {
    viewModel.vets = vets;
  }

  res.render('admin/vets', viewModel);

  console.log(vets)
});

// eliminar veterinaria
router.get('/admin/delete-vet/:vet_id', async (req, res) => {
  const { vet_id } = req.params;

  const confirm = confirm('Desea eliminar este foto');
  
  // photo
  const photo = await Photo.findOneAndDelete({ vet_id });
  // vet
  await Vet.findByIdAndDelete(vet_id);
  // cloudinary
  try {
    await cloudinary.v2.uploader.destroy(photo.cloudinary_id);
  } catch (e) {
    console.log(e);
  }

  res.redirect('/admin/vets');

});


module.exports = router;