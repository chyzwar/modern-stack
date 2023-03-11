
import type {ExecOptions} from "child_process";
import {exec} from "child_process";

import register from "./register.js";
import Logger from "./Logger.js";


/**
 * Create task to exec process
 * @param task task name
 * @param command command to spawn
 * @param options spawn option
 */
function execTask(taskName: string, command: string, options?: ExecOptions): void {

  async function spawnTaskFunction(): Promise<void> {
    const logger = new Logger(taskName);
    logger.info("Started task");
    
    return new Promise<void>((resolve, reject) => {
      const child = exec(command, options, (error, stdout, stderr) => {
        if (stdout) {
          stdout
            .toString()
            .split(/\r?\n/)
            .forEach((line: string) => {
              logger.error(`${line}`);
            }); 
        }

        if (stderr) {
          stderr
            .toString()
            .split(/\r?\n/)
            .forEach((line: string) => {
              logger.error(`${line}`); 
            }); 
        }

        if (error) {
          logger.error("Exec Task error:", error);  
          reject(error);
        }
        else {
          resolve();
        }
      });

      child.on("exit", () => {
        reject();
      });
    });
  }

  register.set(taskName, spawnTaskFunction);
} 

export default execTask;