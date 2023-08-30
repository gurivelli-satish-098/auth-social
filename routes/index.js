const userRouter = require("./user.js");

const registerRoutes = (app) => {
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK.",
    });
  });

  app.use("/v1/user", userRouter);
};

module.exports = registerRoutes;
