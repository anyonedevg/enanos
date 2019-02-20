// requeriments
const router = require('express').Router();
const fs = require('fs-extra');

// models
const { Announce } = require('../models');

//cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dmvfwlcaq',
  api_key: '163943565357421',
  api_secret: '3zG4Eeyh53w-BIMzn2-H-Z94Jq8'
});

// see announces
router.get('/announces', async (req, res) => {
  let viewModel = { announces: {} };
  const announces = await Announce.find();
  if (announces) {
    viewModel.announces = announces;
  }
  res.render('announce/lost-animals', viewModel);
});

// add announce
router.post('/announces/add-announce/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const cloudinaryResult = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    const newAnnounce = new Announce({
      user_id: user_id,
      pet_name: req.body.pet_name,
      cloudinary_id: cloudinaryResult.public_id,
      image_url: cloudinaryResult.secure_url,
      last_date: req.body.last_date,
      last_location: req.body.last_location,
      details: req.body.details,
      contact_number: req.body.contact_number
    });

    const announceResult = await newAnnounce.save();
    console.log(announceResult);

  } catch (e) {
    console.log(e);
  }
  res.redirect('/announces')
});

module.exports = router;