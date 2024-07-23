const groupController = require("../controllers/groupController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(groupController.getAllGroups)
  .post(groupController.createNewGroup)
  .patch(groupController.updateGroupById)
  .delete(groupController.deleteGroupById);

router.get("/:id", groupController.getGroupById);

module.exports = router;
