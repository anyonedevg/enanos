const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  let viewModel = { posts: {} };
  const posts = await Post.find().sort({ timestamp: -1 });
  // console.log(posts);
  viewModel.posts = posts
  res.render('index', viewModel);
});

module.exports = router;