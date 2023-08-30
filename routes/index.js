const userRouter = require("./user.js");
const adminRouter = require("./admin.js");

const registerRoutes = (app) => {
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK.",
    });
  });

  app.use("/v1/user", userRouter);
  app.use("/v1/admin", adminRouter);
};

module.exports = registerRoutes;
