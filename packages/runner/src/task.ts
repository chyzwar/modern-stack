import type TaskFunction from "./TaskFunction.js";
import register from "./register.js";
import Logger from "./Logger.js";

/**
 * Register task
 */
function task(taskName: string, taskFunction: TaskFunction): void {
  async function innerTask(): Promise<void> {
    const logger = new Logger(taskName);
    logger.info("Started task");

    try {
      logger.time("Task completed in");
      await taskFunction();
      logger.timeEnd("Task completed in");
    }
    catch (error: unknown) {
      logger.error(`Task failed with: ${error}`);
      throw error;
    }
  }

  register.set(taskName, innerTask);
}

export default task;