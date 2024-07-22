const Post = require("../models/Post");

// @desc Get all posts, sorted by most recent and paginated
// @route GET /posts
// @access private

const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await Post.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get post by ID
// @route GET /posts/:id
// @access private

const getPostById = async (req, res) => {
  const { id } = req.body;

  // Validate data
  if (!id) {
    return res.status(400).json({ message: "Post ID Required" });
  }

  const post = await Post.findById(id).lean().exec();

  //check if post exists
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  //post has been found, return the post
  res.json(post);
};

// @desc Create new post
// @route POST /posts
// @access private

const createNewPost = async (req, res) => {
  const { userId, caption, image, tags } = req.body;

  // Validate data
  if (!userId || !image) {
    return res.status(400).json({ message: "User ID and Image Required" });
  }

  //check if the tags is an array of strings
  if (tags && !Array.isArray(tags)) {
    return res
      .status(400)
      .json({ message: "Tags must be an array of strings" });
  }

  // Create new post
  const newPost = new Post({
    userId,
    caption,
    image,
    tags,
  });

  const savedPost = await newPost.save();

  res.json(savedPost);
};

// @desc Update post by ID
// @route PUT /posts
// @access private

const updatePostById = async (req, res) => {
  const { id, caption, image, tags } = req.body;

  // Validate data
  if (!id || !image) {
    return res.status(400).json({ message: "Post ID and Image Required" });
  }

  //check if the tags is an array of strings
  if (tags && !Array.isArray(tags)) {
    return res
      .status(400)
      .json({ message: "Tags must be an array of strings" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { caption, image, tags },
    { new: true }
  ).exec();

  //check if post exists
  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  //post has been found and updated, return the updated post
  res.json(updatedPost);
};

// @desc Delete post by ID
// @route DELETE /posts
// @access private

const deletePostById = async (req, res) => {
  const { id } = req.body;

  // Validate data
  if (!id) {
    return res.status(400).json({ message: "Post ID Required" });
  }

  const deletedPost = await Post.findByIdAndDelete(id).exec();

  //check if post exists
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  //post has been found and deleted
  res.json({ message: "Post deleted" });
};

module.exports = {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
};