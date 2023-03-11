import type TaskFunction from "./TaskFunction.js";

const register = new Map<string, TaskFunction>();

export default register;