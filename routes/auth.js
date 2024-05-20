const authRouter = require("express").Router();
const { login } = require("../controllers");
const { findAllUsers, checkEmptyNameAndEmailAndPassword, checkIsUserExists, hashPassword, registrationUser } = require("../middlewares");
const { sendRegisteredUser } = require("../controllers");

authRouter.post("/auth/login", login);
authRouter.post("/auth/registration", findAllUsers, checkEmptyNameAndEmailAndPassword, checkIsUserExists, hashPassword, registrationUser, sendRegisteredUser);

module.exports = authRouter;