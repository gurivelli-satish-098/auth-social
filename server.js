const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/cors");
const notFound = require("./middlewares/notFound");
const registerRoutes = require("./routes");

app.use(corsMiddleware);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));

//Routes
registerRoutes(app);

// Not found
app.use(notFound);

module.exports = app;