const ApiResponse = require("../core/lib/response");
const UserFacade = require("../facades/users");

class UserController {
  constructor() {
    this.userFacade = new UserFacade();
  }

  signUp = async (req, res, next) => {
    try {
      const { email, userName } = req.body;
      const result = await this.userFacade.createUser(
        email,
        userName,
        "user"
      );
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
}

module.exports = UserController;
