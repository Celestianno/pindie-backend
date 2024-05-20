const cors = require("./cors");
const { findAllCategories, findCategoryById, createCategory, updateCategory, deleteCategory, checkIsCategoryExists, checkEmptyName } = require("./categories");
const { 
    findAllUsers, 
    findUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    checkIsUserExists, 
    checkEmptyNameAndEmailAndPassword, 
    checkEmptyNameAndEmail, 
    hashPassword 
} = require("./users");
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
    checkIsVoteRequest
} = require("./games");
const { checkAuth, checkCookiesJWT, registrationUser } = require("./auth");

module.exports = {
    cors,
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName,
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword,
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
    checkAuth,
    checkCookiesJWT,
    registrationUser
}