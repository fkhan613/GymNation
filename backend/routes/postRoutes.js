const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createNewPost)
  .patch(postController.updatePostById)
  .delete(postController.deletePostById);


router
  .route("/:id")
  .get(postController.getPostById);

  
module.exports = router;