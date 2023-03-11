import register from "./register.js";
import Logger from "./Logger.js";
import parallel from "./parallel.js";

/**
 * Create task to start multiple tasks in parallel
 * @param task task name
 * @param taskList command to spawn
 */
function parallelTask(taskName: string, taskList: string[]): void {

  async function parallelTaskFunction(): Promise<void> {
    const logger = new Logger(taskName);
    logger.info("Started task");
    logger.time("Task completed in");
    
    try {
      await parallel(...taskList)()
      logger.timeEnd("Task completed in");
    } catch(e) {
      logger.timeEnd("Task completed in");
      throw e
    }
  }

  register.set(taskName, parallelTaskFunction);
} 

export default parallelTask;