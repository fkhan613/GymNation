// Description: The progress model will track users' progress over time, including the date, workout details, and metrics.

const mongoose = require("mongoose");

const progressLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  metrics: [
    {
      exerciseId: {
        type: String,
      },

      sets: [
        {
          weight: {
            type: Number,
          },
          reps: {
            type: Number,
          },
        },
      ],
    },
  ],
});

const ProgressLog = mongoose.model("ProgressLog", progressLogSchema);

module.exports = ProgressLog;