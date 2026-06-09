const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const config = require("../config/config.js");

async function register(req, res) {
  const { name, email, password, role } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already registered",
    });
  }

  const hashedpass = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedpass,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) {
    return res.status(400).json({
      message: "Inavalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );
  console.log(token);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports = {
  register,
  login,
};
