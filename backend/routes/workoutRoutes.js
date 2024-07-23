const workoutController = require("../controllers/workoutController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createNewWorkout)
  .patch(workoutController.updateWorkoutById)
  .delete(workoutController.deleteWorkoutById);

router.route("/:id").get(workoutController.getWorkoutById);

module.exports = router;
