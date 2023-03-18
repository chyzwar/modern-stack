const path = require("path");

require("dotenv")
  .config({path: path.join(__dirname, ".env")});

process.env.API_LOG_LEVEL = "silent";
process.env.API_PORT = "0";
