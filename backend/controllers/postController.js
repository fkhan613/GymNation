const Post = require("../models/Post");
const User = require("../models/User");

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
  results.results = await Post.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex)
    .exec();

  res.json(results);
};

// @desc Get post by ID
// @route GET /posts/:id
// @access private
const getPostById = async (req, res) => {
  const { id } = req.params;

  // Validate data
  if (!id) {
    return res.status(400).json({ message: "Post ID Required" });
  }

  const post = await Post.findById(id).lean().exec();

  // Check if post exists
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Post has been found, return the post
  res.json(post);
};

const getPostsByUserId = async (req, res) => {
  const { userId } = req.params;

  // Validate data
  if (!userId) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const posts = await Post.find({ userId }).lean().exec();

  // Check if post exists
  if (!posts) {
    return res.status(404).json({ message: "Posts not found" });
  }

  // Posts have been found, return the posts
  res.json(posts);
}

// @desc Create new post
// @route POST /posts
// @access private
const createNewPost = async (req, res) => {
  const { userId, caption, image, tags } = req.body;

  // Validate data
  if (!userId || !image) {
    return res.status(400).json({ message: "User ID and Image Required" });
  }

  // Check if the user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "Post owner not found" });
  }

  // Check if the tags is an array of strings
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
  const { id, userId, caption, image, tags } = req.body;

  // Validate data
  if (!id || !image) {
    return res.status(400).json({ message: "Post ID and Image Required" });
  }

  // Check if the user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "Post owner not found" });
  }

  // Check if the tags is an array of strings
  if (tags && !Array.isArray(tags)) {
    return res
      .status(400)
      .json({ message: "Tags must be an array of strings" });
  }

  const oldPost = await Post.findById(id).exec();

  // Check if post exists
  if (!oldPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Check if the post belongs to the user
  if (oldPost.userId.toString() !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  oldPost.caption = caption || oldPost.caption;
  oldPost.image = image || oldPost.image;
  oldPost.tags = tags || oldPost.tags;

  const updatedPost = await oldPost.save();

  // Post has been found and updated, return the updated post
  res.json(updatedPost);
};

// @desc Delete post by ID
// @route DELETE /posts
// @access private
const deletePostById = async (req, res) => {
  const { id, userId } = req.body;

  // Validate data
  if (!id) {
    return res.status(400).json({ message: "Post ID Required" });
  }

  // Get the post to be deleted
  const deletedPost = await Post.findById(id).exec();

  // Check if post exists
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Check if the post belongs to the user
  if (deletedPost.userId.toString() !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Delete post
  await Post.findByIdAndDelete(id);

  // Post has been found and deleted
  res.json({ message: "Post deleted" });
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createNewPost,
  updatePostById,
  deletePostById,
};
