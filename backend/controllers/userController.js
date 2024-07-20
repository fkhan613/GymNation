const { logEvents } = require("../middleware/logger");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      .status(400)
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
const updateUserById = async (req, res) => {};

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

module.exports = {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
