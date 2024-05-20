const jwt = require("jsonwebtoken");
const path = require("path");
const { users } = require("../models");

const login = (req, res) => {
    const { email, password } = req.body;

    users.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, "some-secret-key", { expiresIn: 3600 });

            return { user, token };
        })
        .then(({ user, token }) => {
            res.status(200).send({ _id: user._id, username: user.username, email: user.email, jwt: token });
        })
        .catch(error => {
            res.status(401).send({ message: error.message });
        });
}

const sendIndex = (req, res) => {
    if(req.cookies.jwt) {
        try {
            jwt.verify(req.cookies.jwt, "some-secret-key");
            return res.redirect("/admin/dashboard");
        } catch (error) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        }
    }

    res.sendFile(path.join(__dirname, "../public/index.html"));
}

const sendDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
}

const sendRegisteredUser = (req, res) => {
    const token = jwt.sign({ _id: req.user._id, username: req.user.username, email: req.user.email }, "some-secret-key", { expiresIn: 3600 });

    res.status(200).send({ ...req.user, jwt: token });
}

module.exports = {
    login,
    sendIndex,
    sendDashboard,
    sendRegisteredUser
}