const gamesRouter = require("express").Router();
const { 
    findAllGames, 
    findGameById, 
    createGame, 
    updateGame, 
    deleteGame, 
    checkEmptyFields, 
    checkIfCategoriesAvaliable, 
    checkIfUsersAreSafe, 
    checkIsGameExists,
    checkIsVoteRequest,
    checkAuth 
} = require("../middlewares");
const { sendAllGames, sendGameById, sendGameCreated, sendGameUpdated, sendGameDeleted } = require("../controllers");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post("/games", findAllGames, checkEmptyFields, checkIfCategoriesAvaliable, checkIsGameExists, checkAuth, createGame, sendGameCreated);
gamesRouter.put("/games/:id", findGameById, checkIsVoteRequest, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, updateGame, sendGameUpdated);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter;