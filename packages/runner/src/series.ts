import type TaskFunction from "./TaskFunction.js";
import mapToTasks from "./mapToTasks.js";

/**
 * Execute task in order (sequentially)
 * @param args task names
 */
function series(...args: string[]): TaskFunction {
  const seriesTask = async(): Promise<void> => {
    for (const task of mapToTasks(args)) {
      await task();
    }
  };
  return seriesTask;
}

export default series;