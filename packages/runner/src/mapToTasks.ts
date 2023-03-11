
import type TaskFunction from "./TaskFunction.js";
import register from "./register.js";

/**
 * Map task names to task function,
 * Find and error if task is missing
 */
function mapToTasks(taskNames: string[]): TaskFunction[] {
  const taskSet = new Set([...taskNames.values()]);
  const funcSet = new Set([...register.keys()]);

  const diff = [...taskSet].filter(x => !funcSet.has(x));

  if (diff.length) {
    throw new Error(`Missing tasks definitions: ${diff.join(",")}`);
  }

  return taskNames.map((task: string) => register.get(task)!);
}

  

export default mapToTasks;