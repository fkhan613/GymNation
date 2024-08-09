const workoutController = require("../controllers/workoutController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, workoutController.getAllWorkouts)
  .post(protect, workoutController.createNewWorkout)
  .patch(protect, workoutController.updateWorkoutById)
  .delete(protect, workoutController.deleteWorkoutById);

router.route("/:id").get(protect, workoutController.getWorkoutById);

module.exports = router;
