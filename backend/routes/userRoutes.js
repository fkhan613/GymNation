const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(userController.getUserById)
  .post(userController.createNewUser)
  .patch(protect, userController.updateUserById)
  .delete(protect, userController.deleteUserById);

router.route("/profile").get(protect, userController.getUserProfile);

router.route("/:userId/followers").get(protect, userController.getUserFollowers);

router.route("/:userId/following").get(protect, userController.getUserFollowing);

router.route("/:userId/profilePicture").patch(protect, userController.updateUserProfilePicture);

module.exports = router;
