import register from "./register.js";
import Logger from "./Logger.js";
import series from "./series.js";

/**
 * Create task to start multiple tasks in series
 * @param task task name
 * @param taskList command to spawn
 */
function seriesTask(taskName: string, taskList: string[]): void {

  async function seriesTaskFunction(): Promise<void> {
    const logger = new Logger(taskName);
    logger.info("Started task");
    logger.time("Task completed in");
    
    try {
      await series(...taskList)()
      logger.timeEnd("Task completed in");
    } catch(e) {
      logger.timeEnd("Task completed in");
      throw e
    }
  }

  register.set(taskName, seriesTaskFunction);
} 

export default seriesTask;