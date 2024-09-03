//importing modules
const express = require("express");
const userController = require("../Controllers/userController");
const { signup, login, resetPassword } = userController;
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

//Reset password route
router.post("/resetPassword", userAuth.resetUserPassword, resetPassword);

module.exports = router;
