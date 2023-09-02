const userRouter = require("./user.js");
const adminRouter = require("./admin.js");
const authRouter = require("./auth.js");

const registerRoutes = (app) => {
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK.",
    });
  });

  app.use("/v1/user", userRouter);
  app.use("/v1/admin", adminRouter);
  app.use("/v1/auth", authRouter);
};

module.exports = registerRoutes;
