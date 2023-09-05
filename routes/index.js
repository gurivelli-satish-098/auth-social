const userRouter = require("./user.js");
const adminRouter = require("./admin.js");
const authRouter = require("./auth.js");
const DatabaseContext = require("../database/index.js");

const registerRoutes = (app) => {
  app.get("/health",async (req, res) => {
    console.log(await DatabaseContext.db.User.findOne())
    res.status(200).json({
      status: "OK.",
    });
  });

  app.get("/", async (req, res)=> {
    const roles = await DatabaseContext.db.Role.findAll();
    res.send(roles);
  });

  app.use("/v1/user", userRouter);
  app.use("/v1/admin", adminRouter);
  app.use("/v1/auth", authRouter);
};

module.exports = registerRoutes;
