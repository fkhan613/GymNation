// Description: The workout model will store information about workouts including the user who created it, the name of the workout, the ids of the exercises pulled form the ExerciseDB API, and the date the workout was created and more.

const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
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
  exercises: [     // Array of exercise ids from the ExerciseDB API
    {
      type: String,
      required: true,
    },
  ],
},
    {
        timestamps: true,
    }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
