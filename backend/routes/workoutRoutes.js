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

router.route("/update-workout-exercises").patch(protect, workoutController.updateWorkoutExercises);

router.route("/:id").get(protect, workoutController.getWorkoutById);

router.route("/:id/exercises/:userId").get(protect, workoutController.getWorkoutExercises);

module.exports = router;
