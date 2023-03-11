
type TaskFunctionSync = () => void;
type TaskFunctionAsync = () => Promise<void>;

type TaskFunction = 
  | TaskFunctionAsync 
  | TaskFunctionSync;

export default TaskFunction;