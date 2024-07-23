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
    pfp,
    fitnessGoals,
  } = req.body;

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
  user.pfp = pfp || user.pfp;
  user.fitnessGoals = fitnessGoals || user.fitnessGoals;
  user.password =
    (password ?? (await bcrypt.hash(password, 10))) || user.password; //if the user enters a new password (password??), hash it, otherwise keep the old password

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

//!FIND A WAY TO FOLLOW AND UNFOLLOW USERS

module.exports = {
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
