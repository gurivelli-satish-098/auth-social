require("dotenv").config();
const ConfigManager = require("./core/lib/manager");
const path = require("path");

async function main() {
  await ConfigManager.init(path.resolve("./config"));
  const DatabaseContext = require("./database");
  const db = await DatabaseContext.connect();
  const app = require("./server");
  return app;
}

main().then((app) => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
