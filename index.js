const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { apiRouter, pagesRouter } = require("./routes");
const connectToDatabase = require("./database/connect");
const { cors } = require("./middlewares");

const PORT = 3001;
const app = express();

connectToDatabase();

app.use(cors, cookieParser(), bodyParser.json(), pagesRouter, apiRouter, express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})