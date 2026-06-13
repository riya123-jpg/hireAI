const express = require("express");
const userController = require("../controller/user.js");
const { indentifyUser } = require("../middleware/authMiddleware.js");
const route = express.Router();

route.post("/user/register", userController.register);
route.post("/user/login", userController.login);
route.get("/user/getme", indentifyUser, userController.getMe);
module.exports = route;
