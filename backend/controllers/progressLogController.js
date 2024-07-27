const ProgressLog = require("../models/ProgressLog");
const User = require("../models/User");

//@desc    Get all progress logs for a user
//@route GET /progress-logs
//@access  Private
const getProgressLogs = async (req, res) => {
  const { userId } = req.body;

  //validate data
  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  //check if user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //get progress logs
  const progressLogs = await ProgressLog.find({ userId }).lean().exec();

  //check if prgress logs exist
  if (!progressLogs) {
    return res.status(404).json({ message: "Progress logs not found" });
  }

  res.json({ progressLogs });
};

// @desc    Get a single progress log for a user
//@route GET /progress-logs/:id
//@access  Private

const getProgressLogById = async (req, res) => {
  const { userId, id } = req.params;

  //validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "All fields required" });
  }

  //check if progress log exists
  const progressLog = await ProgressLog.findById(id).lean().exec();

  if (!progressLog) {
    return res.status(404).json({ message: "Progress log not found" });
  }

  //check if user is authorized to view progress log
  if (progressLog.userId.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.json({ progressLog });
};

// @desc    Create a progress log
//@route POST /progress-logs
//@access  Private

const createProgressLog = async (req, res) => {
  const { userId, workout, metrics } = req.body;

  //validate data
  if (!userId || !workout || !metrics) {
    return res.status(400).json({ message: "All fields required" });
  }

  //check if user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //create progress log
  const progressLog = await ProgressLog.create({ userId, workout, metrics });

  res.status(201).json({ progressLog });
};

// @desc    Update a progress log
//@route PATCH /progress-logs/
//@access  Private

const updateProgressLog = async (req, res) => {
  const { userId, id, workout, metrics } = req.body;

  //validate data
  if (!id || !userId || !workout || !metrics) {
    return res.status(400).json({ message: "All fields required" });
  }

  //check if progress log exists
  const progressLog = await ProgressLog.findById(id).lean().exec();

  if (!progressLog) {
    return res.status(404).json({ message: "Progress log not found" });
  }

  //check if user is authorized to update progress log
  if (progressLog.userId.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //update progress log
  const updatedProgressLog = await ProgressLog.findByIdAndUpdate(
    id,
    { workout, metrics },
    { new: true }
  );

  res.json({ updatedProgressLog });
};

// @desc    Delete a progress log
//@route DELETE /progress-logs
//@access  Private

const deleteProgressLog = async (req, res) => {
  const { userId, id } = req.body;

  //validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "All fields required" });
  }

  //check if progress log exists
  const progressLog = await ProgressLog.findById(id).lean().exec();

  if (!progressLog) {
    return res.status(404).json({ message: "Progress log not found" });
  }

  //check if user is authorized to delete progress log
  if (progressLog.userId.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //delete progress log
  await ProgressLog.findByIdAndDelete(id);

  res.json({ message: "Progress log deleted" });
};

module.exports = {
  getProgressLogs,
  getProgressLogById,
  createProgressLog,
  updateProgressLog,
  deleteProgressLog,
};