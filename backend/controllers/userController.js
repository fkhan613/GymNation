const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

// @desc Get all users
// @route GET /users/:id
// @access Private
const getUserById = async (req, res) => {
  const { id } = req.body;

  // Validate data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const user = await User.findById(id).select("-password").lean().exec();

  //check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //user has been found, return the user
  res.json(user);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  console.log(firstName, lastName, email, password, username);

  // Validate data
  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check for duplicate
  const duplicate = await User.findOne({ email, username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Username or Email already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    username,
  });

  const result = await newUser.save();

  res.json(result);
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUserById = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    username,
    bio,
  } = req.body;

  console.log(req.body)

  // Validate data
  if (!id || !username || !email) {
    return res
      .status(400)
      .json({ message: "User ID, Username, and Email are required" });
  }

  // Does the user exist?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email, username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate._id.toString() !== id) {
    return res
      .status(409)
      .json({ message: "Username or Email already exists" });
  }

  // Update user
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.username = username || user.username;
  user.bio = bio || user.bio;

  //only chnage the password if a new one is provided
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  const result = await user.save();

  res.json(result);
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUserById = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();
  console.log(user);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${user.username} with ID ${user._id} deleted`;

  res.json(reply);
};

const getUserProfile = async (req, res) => {
  const { userId } = req.query;

  // Validate data
  if (!userId) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const user = await User.findById(userId).select("-password").lean().exec();

  //check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //user has been found, return the user
  res.json(user);
};

const getUserFollowing = async (req, res) => {
  const { userId } = req.params;

  // Validate data
  if (!userId) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const user = await User.findById(userId).select("following").lean().exec();

  //check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //user has been found, return the user
  res.json(user);
};

const getUserFollowers = async (req, res) => {
  const { userId } = req.params;

  // Validate data
  if (!userId) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const user = await User.findById(userId).select("followers").lean().exec();

  //check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //user has been found, return the user
  res.json(user);
};

const updateUserProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const { pfp } = req.body;

  // Validate data
  if (!userId || !pfp) {
    return res
      .status(400)
      .json({ message: "User ID and Profile Picture Required" });
  }

  // Does the user exist?
  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user
  user.pfp = pfp;

  const result = await user.save();

  res.json(result);
};

module.exports = {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUserProfile,
  getUserFollowing,
  getUserFollowers,
  updateUserProfilePicture,
};
