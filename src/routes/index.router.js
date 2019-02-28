const router = require('express').Router();
const { Post, PostComment } = require('../models');

router.get('/', async (req, res) => {
  let viewModel = { posts: {} };
  let postsArrays = [];
  let posts = [];

  const postsAggregate = await Post.aggregate([
    { $group: { _id: '$_id' } },
    { $sort: { 'timestamp': -1 } }
  ]);
  for (let postAggregate of postsAggregate) {
    posts.push(postAggregate._id);
  }

  if (posts) {
    for (let post_id of posts) {
      const post = await Post.findById(post_id);
      let objeto = {
        _id: post._id,
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        timestamp: post.timestamp,
        comments: []
      }
      const comments = await PostComment.find({ post_id: post_id }).populate('user_id');
      objeto.comments = comments;

      postsArrays.push(objeto);
    }
    viewModel.posts = postsArrays;
  }
  res.render('index', viewModel);
});

module.exports = router;