const Group = require("../models/Group");
const User = require("../models/User");

// @desc Get all groups
// @route GET /groups
// @access public

const getAllGroups = async (req, res) => {
  const groups = await Group.find().lean().exec();

  //check if groups exist
  if (!groups) {
    return res.status(404).json({ message: "No groups found" });
  }

  res.json({ groups });
};

// @desc Get group by ID
// @route GET /groups/:id
// @access public

const getGroupById = async (req, res) => {
  const { id } = req.body;

  // Validate data
  if (!id) {
    return res.status(400).json({ message: "Group ID Required" });
  }

  const group = await Group.findById(id).lean().exec();

  //check if group exists
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  //group has been found, return the group
  res.json(group);
};

// @desc Create new group
// @route POST /groups
// @access private

const createNewGroup = async (req, res) => {
  const { userId, name, description } = req.body;

  // Validate data
  if (!userId || !name) {
    return res.status(400).json({ message: "User ID and Group Name Required" });
  }

  //check if the user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Create new group
  const newGroup = new Group({
    owner: userId,
    name,
    description,
  });

  await newGroup.save();

  res.json(newGroup);
};

// @desc Update group by ID
// @route PATCH /groups
// @access private

const updateGroupById = async (req, res) => {
  const { id, userId, name, description } = req.body;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Group ID and User ID Required" });
  }

  const group = await Group.findById(id).lean().exec();

  //check if group exists
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  //check if the group belongs to the user
  if (group.owner !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Update group
  await Group.findByIdAndUpdate(id, { name, description });

  res.json({ message: "Group updated" });
};

// @desc Delete group by ID
// @route DELETE /groups
// @access private

const deleteGroupById = async (req, res) => {
  const { id, userId } = req.body;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Group ID and User ID Required" });
  }

  const group = await Group.findById(id).lean().exec();

  //check if group exists
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  //check if the group belongs to the user
  if (group.owner !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Delete group
  await Group.findByIdAndDelete(id);

  res.json({ message: "Group deleted" });
};

//!ADD A WAY TO ADD MEMEBERS TO A GROUP

module.exports = {
  getAllGroups,
  getGroupById,
  createNewGroup,
  updateGroupById,
  deleteGroupById,
};
