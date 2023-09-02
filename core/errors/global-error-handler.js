const DatabaseContext = require("../../database");
const ConfigManager = require("../lib/config/manager");
const errorHandler = require("./error-handler");

process.on("unhandledRejection", (reason, promise) => {
//   console.log("unhandled promise rejection occurred.");
  throw reason;
});

process.on("uncaughtException", async (error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    const errorMsg = JSON.stringify({ error });
    await notifyCrash(errorMsg);
    await gracefulShutdown();
  }
});

const notifyCrash = async (errorMsg) => {
  try {
    // console.log("Application crashed unexpectedly.", errorMsg);
  } catch (e) {
    // console.log("Crash notification failed. ", e);
  }
};

const gracefulShutdown = async () => {
  // TODO: close any resource dependency here:
  try {
    const db = DatabaseContext.db;
    if (db) {
      await db.sequelize.connectionManager.close();
    }
  } catch (e) {
    // console.log(e);
  }
  process.exit(1);
};
