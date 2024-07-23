const progressLogController = require("../controllers/progressLogController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(progressLogController.getProgressLogs)
  .post(progressLogController.createProgressLog)
  .patch(progressLogController.updateProgressLog)
  .delete(progressLogController.deleteProgressLog);

router
  .route("/progress-logs/:id")
  .get(progressLogController.getProgressLogById);

module.exports = router;
