const bcrypt = require("bcrypt");
const ConfigManager = require("../core/lib/manager");
const compareCredential = async ({type, userSecret, credentials}) => {
  switch (type) {
    case "password":
      return await bcrypt.compare(credentials, userSecret);
    case "mpin":
      return userSecret === credentials;
    case "master-password":
      return credentials === ConfigManager.get("MASTER_PASSWORD");
    default:
      return await bcrypt.compare(credentials, user.userSecret);
  }
};
module.exports = { compareCredential };
