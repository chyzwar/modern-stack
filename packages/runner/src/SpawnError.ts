class SpawnError extends Error {
  public code: number;

  public taskName: string;

  public constructor(message: string, code: number, taskName: string) {
    super(message);

    this.code = code;
    this.taskName = taskName;
  }
}

export default SpawnError;