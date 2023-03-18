import {config} from "dotenv";
import {join} from "path";

config({path: join(__dirname, ".env")});

process.env.API_LOG_LEVEL = "silent";
process.env.API_PORT = "0";
