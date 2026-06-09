const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

async function indentifyUser(req, res, next) {
  console.log("Authorization header:", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  //   const token = req.cookie.token;
  console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "not authorized,no token",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  req.user = decoded;
  next();
}

async function recruiterOnly(req, res, next) {
  console.log("hello");
  if (req.user.role !== "recruiter") {
    return res.status(400).json({
      messgae: "only recruiter can do this",
    });
  }
  next();
}

async function seekerOnly(req, res, next) {
  if (req.user.role !== "seeker") {
    return res.status(400).json({
      messgae: "only job seekers can do this",
    });
  }
  next();
}

module.exports = { indentifyUser, recruiterOnly, seekerOnly };
