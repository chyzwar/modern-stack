import mapToTasks from "./mapToTasks.js";
import type TaskFunction from "./TaskFunction.js";

function parallel(...args: string[]): TaskFunction {
  const parallelTask = async(): Promise<void> => {
    await Promise.all(mapToTasks(args).map((task) => task()));
  };

  return parallelTask;
}

export default parallel;
