const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createNewPost)
  .patch(protect, postController.updatePostById)
  .delete(protect, postController.deletePostById);

router.route("/:id").get(protect, postController.getPostById);

module.exports = router;
