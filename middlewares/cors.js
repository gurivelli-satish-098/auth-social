const cors = require("cors");

const allowdomains = [
  "localhost:"+process.env.PORT,
  "http://localhost",
  "http://localhost:3000",
];

module.exports = cors({
  origin: async (origin, callback) => {
    const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
    const corsError = new Error(msg);
    if (!origin) {
      return callback(null, true);
    }
    if (
      !allowdomains.includes(origin)
    ) {
      return callback(corsError, false);
    }
    callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true, // allow session cookie from browser to pass through
});
