const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_ACCESS_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user, rememberMe) => {

  const expiresIn = rememberMe ? "5d" : "4h";

  return jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    REFRESH_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_ACCESS_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
