const ConfigManager = require("../core/lib/manager");
const ApiResponse = require("../core/lib/response");
const AuthFacade = require("../facades/auth");

class AuthController {
  constructor() {
    this.authFacade = new AuthFacade();
  }

  createPassword = async (req, res, next) => {
    try {
      const { userId, newPassword, confirmPassword } = req.body;
      const token = await this.authFacade.createPassword(
        userId,
        newPassword,
        confirmPassword
      );
      res.cookie("_token", token, {
        httpOnly: true,
        secure: true,
        domain: ConfigManager.get("AUTH_COOKIE_DOMAIN"),
        path: "/",
        sameSite: "strict",
        maxAge: parseInt(ConfigManager.get("AUTH_COOKIE_EXPIRY")),
      });
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "Password was successfully created.",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
