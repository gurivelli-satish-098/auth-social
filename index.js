require("dotenv").config();
const ConfigManager = require("./core/lib/manager");
const path = require("path");

const main = async () => {
  await ConfigManager.init(path.resolve("./config"));
  const DatabaseContext = require("./database");
  const db = await DatabaseContext.connect();
  const app = require("./server");
  return app;
};

const onSuccess = async (app) => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const onError = async (err) => {
  console.log({message: err.message, stack: err.stack});
  process.exit(1);
};

main().then(onSuccess).catch(onError);
