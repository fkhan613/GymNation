const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get()
  .post(userController.createNewUser)
  .patch()
  .delete(userController.deleteUserById);

module.exports = router;
