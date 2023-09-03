const fs = require("fs");

class ConfigManager {
  static _params = {};
  static _config = null;
  static _configPath = null;
  static _configDir = null;
  static _useEnvForDebug = null;
  static _configFile = null;
  /**
   * Initialize configuration
   * @param {*} configDir Absolute path of directory containg config json files
   * @returns App configuration
   */

  static init = async (configDir) => {
    console.log("Initializing config...");
    if (
      ConfigManager._config &&
      Object.keys(ConfigManager._config).length > 0
    ) {
      console.log("Skipping - Config already in memory...");
      return;
    }
    ConfigManager._configDir = configDir;
    ConfigManager._configPath = `${configDir}/config.${
      process.env.ENV || process.env.NODE_ENV || "dev"
    }.json`;
    ConfigManager._useEnvForDebug = await ConfigManager._isDebugEnabled();
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

  static get config() {
    return ConfigManager._useEnvForDebug ? process.env : ConfigManager._config;
  }

  static refreshConfig = async () => {
    console.log("Refreshing config data...");
    ConfigManager._config = await ConfigManager._loadConfig();
    console.log("Config refreshed successfully.");
  };
}

module.exports = ConfigManager;
