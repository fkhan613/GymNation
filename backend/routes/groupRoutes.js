const groupController = require("../controllers/groupController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(groupController.getAllGroups)
  .post(groupController.createNewGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

router.get("/:id", groupController.getGroupById);

module.exports = router;
