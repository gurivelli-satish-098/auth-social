const fs = require("fs");

class ConfigManager {
  static _configDir = null;
  static _useEnvForDebug = null;
  static _params = {};

  /**
   * Initialize configuration
   * @param {*} configDir Absolute path of directory containg config json files
   * @returns App configuration
   */

  static init = async (configDir) => {
    console.log("Initializing config...");
    ConfigManager._configDir = configDir;
    ConfigManager._configPath = `${configDir}/config.${
      process.env.ENV || process.env.NODE_ENV || "dev"
    }.json`;
    ConfigManager._useEnvForDebug = ConfigManager._isDebugEnabled();
    ConfigManager._config = await ConfigManager._loadConfig();
  };

  static _loadConfig = async () => {
    const config = await ConfigManager._loadConfigDataFromFile();
    Object.keys(config).map((configKey) => {
      switch (config[configKey].type) {
        case "parameter":
          ConfigManager._params[config[configKey].key] =
            config[configKey].value;
          break;
        default:
      }
    });
    console.log("Successfully loaded config.");
    return {
      ...ConfigManager._params,
    };
  };

  static _loadConfigDataFromFile = async () => {
    const configFile = fs.readFileSync(ConfigManager._configPath, "utf8");
    const config = JSON.parse(configFile);
    ConfigManager._configFile = config;
    return config;
  };

  static _isDebugEnabled = async () => {
    const localEnvs = ["dev", "development", "local", null, undefined];
    return (
      localEnvs.includes(process.env.ENV) ||
      localEnvs.includes(process.env.NODE_ENV) ||
      process.env.DEBUG === "true"
    );
  };

  static get = (key) => {
    if (ConfigManager._useEnvForDebug) {
      return ConfigManager._config[key] || process.env[key];
    }
    return ConfigManager._config[key];
  };
}

module.exports = ConfigManager;
