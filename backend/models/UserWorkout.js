// Description: The workout model will store information about workouts including the user who created it, the name of the workout, the ids of the exercises pulled form the ExerciseDB API, and the date the workout was created and more.

const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  bodyPart: {
    type: String,
  },
  equipment: {
    type: String,
  },
  gifUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  target: {
    type: String,
  },
  secondaryMuscles: {
    type: [String],
  },
  instructions: {
    type: [String],
  },
});

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    exercises: [exerciseSchema],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    coverPhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dr2xuaa6e/image/upload/v1723169756/default-workout-img.png",
    },
  },
  {
    timestamps: true,
  }
);

const UserWorkout = mongoose.model("UserWorkout", workoutSchema);

module.exports = UserWorkout;
