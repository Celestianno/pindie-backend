const { sendAllCategories, sendCategoryById, sendCategoryCreated, sendCategoryUpdated, sendCategoryDeleted } = require("./categories");
const { sendAllUsers, sendUserById, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe } = require("./users");
const { sendAllGames, sendGameById, sendGameCreated, sendGameUpdated, sendGameDeleted } = require("./games");
const { login, sendIndex, sendDashboard, sendRegisteredUser } = require("./auth");

module.exports = {
    sendAllCategories,
    sendCategoryById,
    sendCategoryCreated,
    sendCategoryUpdated,
    sendCategoryDeleted,
    sendAllUsers,
    sendUserById,
    sendUserCreated,
    sendUserUpdated,
    sendUserDeleted,
    sendMe,
    sendAllGames,
    sendGameById,
    sendGameCreated,
    sendGameUpdated,
    sendGameDeleted,
    login,
    sendIndex,
    sendDashboard,
    sendRegisteredUser
}