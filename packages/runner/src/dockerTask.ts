
import {spawn} from "child_process";
import type {SpawnOptions} from "child_process";

import register from "./register.js";
import Logger from "./Logger.js";
import SpawnError from "./SpawnError.js";


interface DockerTaskOptions extends SpawnOptions{
  /**
   * Automatically remove the container when it exits
   */ 
  rm?: boolean;
  /**
   * Keep STDIN open even if not attached
   */
  interactive?: boolean;
  /**
   * Assign a name to the container
   */
  name?: string;
  /**
   * List of ports to expose
   */
  ports?: `${number}:${number}`[]
}

/**
 * Create task to run docker container
 * @param task task name
 * @param image name of container image
 * @param args arguments for command
 * @param options spawn option
 */
function dockerTask(taskName: string, image: string, options?: DockerTaskOptions): void {
  const args = ["run"];
  if (options?.rm) {
    args.push("--rm");
  }
  if (options?.interactive) {
    args.push("--interactive");
  }
  if (options?.name) {
    args.push(`--name ${options.name}`);
  }
  if (options?.env) {
    Object
      .entries(options.env)
      .forEach(([key, value]) => {
        if (value) {
          args.push(`-e ${key}=${value}`);
        }
      });
  }

  if (options?.ports) {
    options.ports
      .forEach((value) => {
        if (value) {
          args.push(`-p ${value}`);
        }
      });
  }
  
  args.push(image);

  async function spawnTaskFunction(): Promise<void> {
    const logger = new Logger(taskName);
    logger.info("Started task");

    logger.time("Task completed in");
    const proc = spawn("docker", args, {shell: true});
    
    return new Promise<void>((resolve, reject) => {
      proc.stdout.on("data", (data?: Buffer) => {
        if (data) {
          data
            .toString()
            .split("\n")
            .filter(s => s !== "")
            .forEach((line: string) => {
              logger.info(`${line}`); 
            }); 
        }
      });
      
      proc.stderr.on("data", (data?: Buffer) => {
        if (data) {
          data
            .toString()
            .split("\n")
            .filter(s => s !== "")
            .forEach((line: string) => {
              logger.info(`${line}`); 
            }); 
        }
      });
      
      proc.on("error", (error) => {
        logger.error(`Task <${taskName}> failed with:`, error);
      });
      
      proc.on("close", (code: number) => {
        if (code === 0) {
          logger.timeEnd("Task completed in");
          resolve();
        }
        else {
          logger.error(`Failed with code: ${code}`);
          reject(
            new SpawnError("Docker Task closed with non-zero exit code", code, taskName)
          );
        }
      });
    });
  }

  register.set(taskName, spawnTaskFunction);
} 

export default dockerTask;