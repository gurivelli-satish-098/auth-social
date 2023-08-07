require("dotenv").config();
const fs = require("fs");

async function teardownDBMigrateSetup() {
  const config = {};
  fs.writeFileSync(__dirname + "/.././sequelize-config.js", JSON.stringify(config), {
    flag: "w",
  });
}
teardownDBMigrateSetup().then(() => {
  console.log("DB closed successfully...");
  process.exit();
});
