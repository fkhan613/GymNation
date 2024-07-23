const workoutController = require("../controllers/workoutController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createWorkout)
  .patch(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

router.route("/:id").get(workoutController.getWorkoutById);

module.exports = router;
