const { games } = require("../models");

const findAllGames = async(req, res, next) => {
    console.log("GET api/games");

    if(req.query["categories.name"]) {
        req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
        next();
        return;
    }

    req.gamesArray = await games.find({}).populate({ path: "users", select: "-password" }).populate("categories");
    next();
}

const findGameById = async(req, res, next) => {
    console.log("GET api/games/:id");

    try {
        req.game = await games.findById(req.params.id).populate({ path: "users", select: "-password" }).populate("categories");
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Game not found" }));
    }
}

const createGame = async(req, res, next) => {
    console.log("POST api/games");
    
    try {
        console.log(req.body);
        req.game = await games.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error creating game" }));
    }
}

const updateGame = async(req, res, next) => {
    console.log("PUT api/games/:id");

    try {
        req.game = await games.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error updating game" }));
    }
}

const deleteGame = async(req, res, next) => {
    console.log("DELETE api/games/:id");

    try {
        req.game = await games.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error deleting game" }));
    }
}

const checkEmptyFields = async(req, res, next) => {
    if(req.isVoteRequest) {
        next();
        return;
    }

    if(
        !req.body.title ||
        !req.body.description ||
        !req.body.image ||
        !req.body.link ||
        !req.body.developer
    ) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Empty fields" }));
    } else {
        next();
    }
}

const checkIfCategoriesAvaliable = async(req, res, next) => {
    if(req.isVoteRequest) {
        next();
        return;
    }

    if(!req.body.categories || req.body.categories.length === 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Select at least one category" }));
    } else {
        next();
    }
}

const checkIfUsersAreSafe = async(req, res, next) => {
    if(!req.body.users) {
        next();
        return;
    }

    if(req.body.users.length - 1 === req.game.users.length) {
        next();
        return;
    } else {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Cannot delete users or add more than one user" }));
    }
}

const checkIsGameExists = async(req, res, next) => {
    const isInArray = req.gamesArray.find((game) => {
        return req.body.title === game.title;
    });

    if(isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Game already exist" }));
    } else {
        next();
    }
}

const checkIsVoteRequest = async(req, res, next) => {
    if(Object.keys(req.body).length === 1 && req.body.users) {
        req.isVoteRequest = true;
    }

    next();
}

module.exports = {
    findAllGames,
    findGameById,
    createGame,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIfCategoriesAvaliable,
    checkIfUsersAreSafe,
    checkIsGameExists,
    checkIsVoteRequest
}