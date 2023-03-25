import {config} from "dotenv";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

config({path: join(dirname(fileURLToPath(import.meta.url)), ".env")});

process.env.API_LOG_LEVEL = "silent";