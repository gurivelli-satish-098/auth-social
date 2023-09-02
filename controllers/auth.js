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
        success: !!token,
        data: null,
        message: "successfully logged-in",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  logoutUser = (req, res) => {
    let cookieName = "_token"
    res.clearCookie(cookieName, {
      secure: true,
      domain: ConfigManager.get("AUTH_COOKIE_DOMAIN"),
      path: "/",
      sameSite: "strict",
      httpOnly: true,
    });
    const response = new ApiResponse({
      success: true,
      data: null,
      message: "user logged out successfully",
    });
    res.status(response.status).json(response);
  };
}

module.exports = AuthController;
