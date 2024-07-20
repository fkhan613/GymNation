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
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  metrics:[
    {
        exerciseId: {
            type: String,
            required: true,
        },

        sets: {
            type: Number,
            required: true,
        },

        reps: {
            type: Number,
            required: true,
        },

        weight: {
            type: Number,
            required: true,
        }
    }
  ]
});

const ProgressLog = mongoose.model("ProgressLog", progressLogSchema);

module.exports = ProgressLog;
