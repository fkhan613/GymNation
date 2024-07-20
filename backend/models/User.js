// Description: User model schema... not much else to say here.


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    pfp: {
      type: String,
      default:
        "https://res.cloudinary.com/dr2xuaa6e/image/upload/f_auto,q_auto/default-pfp", //<-- default pfp using cloudinary
    },
    fitnessGoals: {
      type: Map,
      of: Boolean,
    },                // <-- fitnessGoals is a map of strings to booleans i.e. { "Lose 15 pounds in 3 months": true, "Gain 4 pounds of lean muscle": false }
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
