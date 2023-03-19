import {config} from "dotenv";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

console.log({path: join(dirname(fileURLToPath(import.meta.url)), ".env")});
config({path: join(dirname(fileURLToPath(import.meta.url)), ".env")});

// process.env.API_LOG_LEVEL = "silent";
process.env.API_PORT = "0";
