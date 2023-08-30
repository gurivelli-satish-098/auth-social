const ApiResponse = require("../core/lib/response");
const UserFacade = require("../facades/user");

class AdminController {
  constructor() {
    this.userFacade = new UserFacade();
  }

  createAdmin = async (req, res, next) => {
    try {
      const { email } = req.body;
      const userName = await this.userFacade.createUserName();
      const result = await this.userFacade.createUser(
        email,
        null,
        null,
        userName,
        "admin"
      );
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
