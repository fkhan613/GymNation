const express = require("express");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/login", login);

router.route("/refresh", refresh);

module.exports = router;
