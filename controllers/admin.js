const ConfigManager = require("../core/lib/manager");
const ApiResponse = require("../core/lib/response");
const UserFacade = require("../facades/users");

class AdminController {
  constructor() {
    this.userFacade = new UserFacade();
  }

  createAdmin = async (req, res, next) => {
    try {
      const { email } = req.body;
      const userName = await this.userFacade.createUserName();
      const result = await this.userFacade.createUser(email, userName, "admin");
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "Admin was successfully created.",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  aprroveAdmin = async (req, res, next) => {
    try {
      const { adminEmail, userEmail } = req.body;
      const result = await this.userFacade.approveUser(adminEmail, userEmail);
      const response = new ApiResponse({
        success: !!result,
        data: result,
        message: "Granted the access.",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  masterLogin = async (req, res, next) => {
    try {
      const { adminEmail, userName, identifierSecret } = req.body;
      const token = await this.userFacade.masterLogin(
        adminEmail,
        userName,
        identifierSecret
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
}

module.exports = AdminController;
