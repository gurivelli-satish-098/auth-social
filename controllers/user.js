const ConfigManager = require("../core/lib/manager");
const ApiResponse = require("../core/lib/response");
const UserFacade = require("../facades/users");

class UserController {
  constructor() {
    this.userFacade = new UserFacade();
  }

  signUp = async (req, res, next) => {
    try {
      const { email, userName } = req.body;
      const result = await this.userFacade.createUser(email, userName, "user");
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "user was successfully created.",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  userLogin = async (req, res, next) => {
    try {
      const { email, userSecret } = req.body;
      const token = await this.userFacade.userLogin(email, userSecret);
      res.cookie("_token", token, {
        httpOnly: true,
        secure: true,
        // domain: ConfigManager.get("AUTH_COOKIE_DOMAIN"),
        path: "/",
        sameSite: "strict",
        maxAge: parseInt(ConfigManager.get("AUTH_COOKIE_EXPIRY")),
      });
      const response = new ApiResponse({
        success: !!token,
        data: null,
        message: "successfully logged-in",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
