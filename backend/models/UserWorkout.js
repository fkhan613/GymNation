// Description: The workout model will store information about workouts including the user who created it, the name of the workout, the ids of the exercises pulled form the ExerciseDB API, and the date the workout was created and more.

const mongoose = require("mongoose");

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
    coverPhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dr2xuaa6e/image/upload/v1723169756/default-workout-img.png",
    },
    visibility: {
      type: String,
      default: "private",
    },
    exercises: [
      {
        exercise: {
          bodyPart: {
            type: String,
            required: true,
          },
          equipment: {
            type: String,
            required: true,
          },
          gifUrl: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          target: {
            type: String,
            required: true,
          },
          secondaryMuscles: {
            type: [String],
            required: true,
          },
          instructions: {
            type: [String],
            required: true,
          },
          id: {
            type: String,
            required: true,
          },

          sets: [
            {
              weight: {
                type: Number,
                required: true,
              },
              reps: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserWorkout = mongoose.model("UserWorkout", workoutSchema);

module.exports = UserWorkout;
