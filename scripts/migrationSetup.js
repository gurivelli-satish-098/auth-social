require("dotenv").config();
const fs = require("fs");

const ConfigManager = require("../core/lib/manager");
async function generateDBMigrateSetup() {
  await ConfigManager.init(__dirname + "/../config");
  const config = {
    production: {
      host: ConfigManager.get("DB_HOST"),
      username: ConfigManager.get("DB_USER"),
      password: ConfigManager.get("DB_PASSWORD"),
      port: ConfigManager.get("DB_PORT"),
      dialect: ConfigManager.get("DB_DIALECT"),
      database: ConfigManager.get("DB_DATABASE"),
      seederStorage: "sequelize",
    },
  };
  fs.writeFileSync(
    __dirname + "/../sequelize-config.js",
    "module.exports = " + JSON.stringify(config),
    {
      flag: "w",
    }
  );
}
generateDBMigrateSetup().then(() => {
  console.log("DB connected successfully...");
  process.exit();
});
