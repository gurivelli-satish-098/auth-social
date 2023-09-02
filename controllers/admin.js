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
        message: "Admin was successfully created.",
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  verifyAdmin = async (req, res, next) => {
    try {
      const { email, userName, identifierSecret } = req.body;
      const result = await this;
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
}

module.exports = AdminController;
