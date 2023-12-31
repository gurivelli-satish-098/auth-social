"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const ConfigManager = require("../core/lib/manager");

const SqlPoolSettings = process.env.IS_LAMBDA
  ? {
      max: 50,
      min: 0,
      idle: 0,
      acquire: 10000,
      evict: 60000,
    }
  : {
      max: 100,
      min: 1,
      idle: 1,
      acquire: 60000,
      evict: 60000,
    };

const baseModelPath = `${__dirname}/../models`;
const Models = fs
  .readdirSync(baseModelPath)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .map((file) => require(path.join(baseModelPath, file)));

module.exports = class DatabaseContext {
  static loadSequelize = async () => {
    try {
      this._sequelize = new Sequelize(ConfigManager.get("DB_DATABASE"), null, null, {
        dialect: ConfigManager.get("DB_DIALECT"),
        port: ConfigManager.get("DB_PORT"),
        replication: {
          read: [
            {
              host: ConfigManager.get("DB_READ_HOST"),
              username: ConfigManager.get("DB_READ_USER"),
              password: ConfigManager.get("DB_READ_PASSWORD"),
            },
          ],
          write: {
            host: ConfigManager.get("DB_HOST"),
            username: ConfigManager.get("DB_USER"),
            password: ConfigManager.get("DB_PASSWORD"),
          },
        },
        pool: SqlPoolSettings,
        dialectOptions: {
          connectTimeout: 60000, // default is 10s which causes occasional ETIMEDOUT errors (see https://stackoverflow.com/a/52465919/491553)
        },
        logging: false,
        retry: {
          match: [
            /Deadlock/i,
            Sequelize.ConnectionError,
            Sequelize.ConnectionRefusedError,
            Sequelize.ConnectionTimedOutError,
            Sequelize.TimeoutError,
          ],
          max: 2,
          backoffBase: 2000,
          backoffExponent: 2,
        },
      });
      await this._sequelize.authenticate();
      return this._sequelize;
    } catch (error) {
      throw error;
    }
  };

  static connect = async () => {
    console.log("Connecting to DB...");
    // re-use the sequelize instance across invocations to improve performance
    if (!this._sequelize) {
      this._sequelize = await DatabaseContext.loadSequelize();
      const db = {};
      Models.forEach((modelDef) => {
        const model = modelDef(this._sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });
      Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      db.sequelize = this._sequelize;
      db.Sequelize = Sequelize;
      this._db = db;
    } else {
      // restart connection pool to ensure connections are not re-used across invocations
      this._sequelize.connectionManager.initPools();

      // restore `getConnection()` if it has been overwritten by `close()`
      if (
        Object.prototype.hasOwnProperty.call(this._sequelize.connectionManager, "getConnection")
      ) {
        delete this._sequelize.connectionManager.getConnection;
      }
    }
    return this._db;
  };

  static get db() {
    return this._db;
  }
};
