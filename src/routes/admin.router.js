// requeriments
const fs = require('fs-extra');
const router = require('express').Router();

// models
const { Post, PostComment, Vet } = require('../models');

// cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dmvfwlcaq',
  api_key: '163943565357421',
  api_secret: '3zG4Eeyh53w-BIMzn2-H-Z94Jq8'
});

// add vet
router.get('/admin/add-vet', (req, res) => {
  res.render('admin/add-vet');
});

router.post('/admin/add-vet', async (req, res) => {
  const { name, address, district } = req.body;
  const { path } = req.file;

  try {
    const cloudinaryResult = await cloudinary.v2.uploader.upload(path);
    const newVet = new Vet({
      name: name,
      address: address,
      district: district,
      cloudinary_id: cloudinaryResult.public_id,
      image_url: cloudinaryResult.secure_url
    });
    await newVet.save();
  } catch (e) {
    console.log(e);
  }
  await fs.unlink(path);

  res.redirect('/vets');

});

// see vets
router.get('/admin/vets', async (req, res) => {
  let viewModel = { vets: {} };
  const vets = await Vet.find();
  if (vets) {
    viewModel.vets = vets;
  }
  res.render('admin/vets', viewModel);
});

// delete vet
router.get('/admin/delete-vet/:vet_id', async (req, res) => {
  const { vet_id } = req.params;

  const deletedVet = await Vet.findByIdAndDelete(vet_id);

  try {
    await cloudinary.v2.uploader.destroy(deletedVet.cloudinary_id);
  } catch (e) {
    console.log(e);
  }

  res.redirect('/admin/vets');
});


// update vet image
router.post('/admin/update-vet-image', async (req, res) => {
  const { vet_id } = req.body;
  const { path } = req.file;

  try {
    const oldVet = await Vet.findById(vet_id);

    const cloudinaryResult = await cloudinary.v2.uploader.upload(path);

    await Vet.findByIdAndUpdate(vet_id, {
      cloudinary_id: cloudinaryResult.public_id,
      image_url: cloudinaryResult.secure_url
    });

    await cloudinary.v2.uploader.destroy(oldVet.cloudinary_id);

  } catch (e) {
    console.log(e);
  }
  await fs.unlink(req.file.path);

  res.redirect('/admin/vets');
})


// update vet data 
router.post('/admin/update-vet-data', async (req, res) => {
  const { vet_id, name, address, district } = req.body;
  await Vet.findByIdAndUpdate(vet_id, {
    name: name,
    address: address,
    district: district
  });
  res.redirect('/admin/vets');
})

// add post
router.post('/admin/add-post', async (req, res) => {
  const { title, content } = req.body;
  const { path } = req.file;

  console.log(req.file);

  try {
    const cloudinaryResult = await cloudinary.v2.uploader.upload(path);
    const newPost = new Post({
      title: title,
      content: content,
      cloudinary_id: cloudinaryResult.public_id,
      image_url: cloudinaryResult.secure_url
    });
    await newPost.save();
  } catch (e) {
    console.log(e);
  }
  await fs.unlink(path);

  res.redirect('/');
});

//delete post
router.get('/admin/delete-post/:post_id', async (req, res) => {
  const { post_id } = req.params;
  await PostComment.deleteMany({ post_id: post_id });
  const post = await Post.findByIdAndDelete(post_id);
  try {
    await cloudinary.v2.uploader.destroy(post.cloudinary_id);
  } catch (e) {
    console.log(e);
  }

  res.redirect('/');
})

module.exports = router;