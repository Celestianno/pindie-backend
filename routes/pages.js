const pagesRouter = require("express").Router();
const { checkAuth, checkCookiesJWT } = require("../middlewares");
const { sendIndex, sendDashboard } = require("../controllers");

pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/**", checkCookiesJWT, checkAuth, sendDashboard);

module.exports = pagesRouter;