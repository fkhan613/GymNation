const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/jwt");
const User = require("../models/User");

//@desc login
//@route POST /login
//@access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateAccessToken(user);
    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
