const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router
  .route("/")
  .get(authenticate, userController.getUserById)
  .post(userController.createNewUser)
  .patch(authenticate, userController.updateUserById)
  .delete(authenticate, userController.deleteUserById);

module.exports = router;
