const express = require("express");
const userController = require("../controller/user.js");
const route = express.Router();

route.post("/user/register", userController.register);
route.get("/user/login", userController.login);
module.exports = route;
