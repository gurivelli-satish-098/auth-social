const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/cors");
const notFound = require("./middlewares/notFound");
const registerRoutes = require("./routes");
const errorMiddleware = require("./middlewares/error");

app.use(
  morgan(`[:date[iso]] UTC ":method :url HTTP/:http-version" -status :status -resTime :response-time ms -totalTime :total-time ms :res[content-length] bytes :remote-addr - :remote-user ":referrer" ":user-agent"`, {
    stream: {
      write: (message) => console.log(message.trim()),
    },
  })
);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));

//Routes
registerRoutes(app);

// Not found
app.use(notFound);

// Global error handling
app.use(errorMiddleware);

module.exports = app;
