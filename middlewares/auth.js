const jwt = require("jsonwebtoken");
const { users } = require("../models");

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Authorization required" });
    }

    const token = authorization.replace("Bearer ", "");
    
    try {
        req.user = jwt.verify(token, "some-secret-key");
    } catch (error) {
        return res.status(401).send({ message: "Authorization required" });
    }

    next();
}

const checkCookiesJWT = (req, res, next) => {
    if(!req.cookies.jwt) {
        return res.redirect("/");
    }

    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
    next();
}

const registrationUser = async(req, res, next) => {
    console.log("POST api/auth/registration");
    
    try {
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error creating user" }));
    }
}

module.exports = {
    checkAuth,
    checkCookiesJWT,
    registrationUser
}