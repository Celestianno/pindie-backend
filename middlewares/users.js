const { users } = require("../models");
const bcrypt = require("bcryptjs");

const findAllUsers = async(req, res, next) => {
    console.log("GET api/users");

    req.usersArray = await users.find({}, { password: 0 });

    next();
}

const findUserById = async(req, res, next) => {
    console.log("GET api/users/:id");
    
    try {
        req.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "User not found" }));
    }
}

const createUser = async(req, res, next) => {
    console.log("POST api/users");
    
    try {
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error creating user" }));
    }
}

const updateUser = async(req, res, next) => {
    console.log("PUT api/users/:id");

    try {
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error updating user" }));
    }
}

const deleteUser = async(req, res, next) => {
    console.log("DELETE api/users/:id");

    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error deleting user" }));
    }
}

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
      return req.body.email === user.email;
    });

    if(isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "User already exist" }));
    } else {
      next();
    }
  }

const checkEmptyNameAndEmailAndPassword = async(req, res, next) => {
    if(!req.body.username || !req.body.email || !req.body.password) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Empty fields" }));
    } else {
        next();
    }
}

const checkEmptyNameAndEmail = async(req, res, next) => {
    if(!req.body.username || !req.body.email) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Empty fields" }));
    } else {
        next();
    }
}

const hashPassword = async(req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: "Error password hashing" });
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword
}