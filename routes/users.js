const usersRouter = require("express").Router();
const { findAllUsers, 
    findUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    checkIsUserExists, 
    checkEmptyNameAndEmailAndPassword, 
    checkEmptyNameAndEmail, 
    hashPassword,
    checkAuth 
} = require("../middlewares");
const { sendAllUsers, sendUserById, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe } = require("../controllers");

usersRouter.get("/me", checkAuth, sendMe);
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post("/users", findAllUsers, checkEmptyNameAndEmailAndPassword, checkIsUserExists, checkAuth, hashPassword, createUser, sendUserCreated);
usersRouter.put("/users/:id", checkEmptyNameAndEmail, checkAuth, updateUser, sendUserUpdated);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;