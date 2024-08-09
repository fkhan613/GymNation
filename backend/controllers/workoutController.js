const Workout = require("../models/UserWorkout");
const User = require("../models/User");

// @desc Get all workouts the user has created. Ex. Push days, Pull days, Leg days
// @route GET /workouts
// @access private

const getAllWorkouts = async (req, res) => {
  const { userId } = req.query;

  // Validate data
  if (!userId) {
    return res.status(400).json({ message: "User ID Required" });
  }

  //check if the user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const workouts = await Workout.find({ userId }).lean().exec();

  res.json(workouts);
};

// @desc Get workout by ID
// @route GET /workouts/:id
// @access private

const getWorkoutById = async (req, res) => {
  const { id, userId } = req.body;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Workout ID and User ID Required" });
  }

  const workout = await Workout.findById(id).lean().exec();

  //check if workout exists
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  //check if the workout belongs to the user
  if (workout.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //workout has been found, return the workout
  res.json(workout);
};

// @desc Create new workout
// @route POST /workouts
// @access private

const createNewWorkout = async (req, res) => {
  const { userId, name, description, exercises } = req.body;

  // Validate data
  if (!userId || !name || !exercises) {
    return res
      .status(400)
      .json({ message: "User ID, Name, and Exercises Required" });
  }

  //check if the user exists
  const user = await User.findById(userId).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //check if the exercises is an array of strings containing the exercise ids from the ExerciseDB API
  if (exercises && !Array.isArray(exercises)) {
    return res
      .status(400)
      .json({ message: "Exercises must be an array of strings" });
  }

  // Create new workout
  const newWorkout = new Workout({
    userId,
    name,
    description,
    exercises,
  });

  await newWorkout.save();

  res.json(newWorkout);
};

// @desc Update workout by ID
// @route PATCH /workouts
// @access private

const updateWorkoutById = async (req, res) => {
  const { id, userId, name, description, exercises } = req.body;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Workout ID and User ID Required" });
  }

  const workout = await Workout.findById(id).lean().exec();

  //check if workout exists
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  //check if the workout belongs to the user
  if (workout.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //check if the exercises is an array of strings containing the exercise ids from the ExerciseDB API
  if (exercises && !Array.isArray(exercises)) {
    return res
      .status(400)
      .json({ message: "Exercises must be an array of strings" });
  }

  // Update workout
  await Workout.findByIdAndUpdate(id, { name, description, exercises });

  res.json({ message: "Workout updated" });
};

// @desc Delete workout by ID
// @route DELETE /workouts
// @access private

const deleteWorkoutById = async (req, res) => {
  const { id, userId } = req.body;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Workout ID and User ID Required" });
  }

  const workout = await Workout.findById(id).lean().exec();

  //check if workout exists
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  //check if the workout belongs to the user
  if (workout.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Delete workout
  await Workout.findByIdAndDelete(id);

  res.json({ message: "Workout deleted" });
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createNewWorkout,
  updateWorkoutById,
  deleteWorkoutById,
};
