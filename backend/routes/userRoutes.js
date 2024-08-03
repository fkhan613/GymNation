const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.getUserById)
  .post(userController.createNewUser)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
