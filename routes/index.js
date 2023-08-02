const registerRoutes = (app) => {
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK.",
    });
  });
};

module.exports = registerRoutes;
