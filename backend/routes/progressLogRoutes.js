const progressLogController = require("../controllers/progressLogController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, progressLogController.getProgressLogs)
  .post(protect, progressLogController.createProgressLog)
  .patch(protect, progressLogController.updateProgressLog)
  .delete(protect, progressLogController.deleteProgressLog);

router
  .route("/progress-logs/:id")
  .get(protect, progressLogController.getProgressLogById);

module.exports = router;
