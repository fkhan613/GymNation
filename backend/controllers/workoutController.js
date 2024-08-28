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
  const { userId } = req.query;
  const { id } = req.params;


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
  if (workout.userId.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //workout has been found, return the workout
  res.json(workout);
};

const getWorkoutExercises = async (req, res) => {
  const { id, userId } = req.params;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Workout ID and user ID required" });
  }

  try {
    const workout = await Workout.findById(id).lean().exec();

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if the workout belongs to the user
    if (workout.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    console.log("Authorized access - Workout ID:", id, "User ID:", userId);

    // Workout has been found, return the exercises
    res.json(workout.exercises);
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create new workout
// @route POST /workouts
// @access private

const createNewWorkout = async (req, res) => {
  const { userId, name, description, exercises, visibility, coverPhoto } =
    req.body;

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
      .json({ message: "Exercises must be an array of objects" });
  }

  // Validate coverPhoto URL
  if (coverPhoto && typeof coverPhoto !== "string") {
    return res.status(400).json({ message: "Cover photo must be a valid URL" });
  }

  console.log("Cover photo sent to server:", coverPhoto);

  // Create new workout
  try {
    const newWorkout = new Workout({
      userId,
      name,
      description,
      exercises: exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
        target: exercise.target,
        secondaryMuscles: exercise.secondaryMuscles,
        instructions: exercise.instructions,
      })),
      visibility,
      coverPhoto,
    });

    await newWorkout.save();
    console.log("Workout created successfully:", newWorkout);
    res
      .status(201)
      .json({ message: "Workout created successfully", workout: newWorkout });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: "Error creating workout", error });
  }
};

// @desc Update workout by ID
// @route PATCH /workouts
// @access private

const updateWorkoutById = async (req, res) => {
  const { id, userId, name, description, exercises, visibility, coverPhoto } =
    req.body;

  // Validate data
  if (!id || !userId) {
    return res.status(400).json({ message: "Workout ID and User ID Required" });
  }

  const workout = await Workout.findById(id).lean().exec();

  //check if workout exists
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  console.log(workout.userId, userId);
  //check if the workout belongs to the user
  if (workout.userId.toString() != userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //check if the exercises is an array of strings containing the exercise ids from the ExerciseDB API
  if (exercises && !Array.isArray(exercises)) {
    return res
      .status(400)
      .json({ message: "Exercises must be an array of objects" });
  }

  // Validate coverPhoto URL
  if (coverPhoto && typeof coverPhoto !== "string") {
    return res.status(400).json({ message: "Cover photo must be a valid URL" });
  }

  // Update workout
  await Workout.findByIdAndUpdate(id, {
    userId,
    name,
    description,
    exercises: exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      bodyPart: exercise.bodyPart,
      equipment: exercise.equipment,
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      secondaryMuscles: exercise.secondaryMuscles,
      instructions: exercise.instructions,
    })),
    visibility,
    coverPhoto,
  });

  res.json({ message: "Workout updated" });
};

const updateWorkoutExercises = async (req, res) => {
  const { id, userId, exercises } = req.body;

  console.log("Exercises:", exercises);

  // Validate data
  if (!id || !userId || !exercises) {
    return res
      .status(400)
      .json({ message: "Workout ID, User ID, and Exercises Required" });
  }

  const workout = await Workout.findById(id).lean().exec();

  //check if workout exists
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  //check if the workout belongs to the user
  if (workout.userId.toString() != userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  //check if the exercises is an array of strings containing the exercise ids from the ExerciseDB API
  if (exercises && !Array.isArray(exercises)) {
    return res
      .status(400)
      .json({ message: "Exercises must be an array of objects" });
  }

  // Update workout
  await Workout.findByIdAndUpdate(id, {
    exercises: exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      bodyPart: exercise.bodyPart,
      equipment: exercise.equipment,
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      secondaryMuscles: exercise.secondaryMuscles,
      instructions: exercise.instructions,
    })),
  });

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
  if (workout.userId.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Delete workout
  await Workout.findByIdAndDelete(id);

  res.json({ message: "Workout deleted" });
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutExercises,
  createNewWorkout,
  updateWorkoutById,
  updateWorkoutExercises,
  deleteWorkoutById,
};
