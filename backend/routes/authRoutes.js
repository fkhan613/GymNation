const express = require("express");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/login", login);

router.route("/refresh", refresh);

router.route("/logout",protect, logout);

module.exports = router;
