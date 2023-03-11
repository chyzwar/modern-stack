class Logger {
  public static calls: unknown[][] = [];

  public info(...args: unknown[]): void {
    Logger.calls.push(args);
  }

  public time(...args: unknown[]): void {
    Logger.calls.push(args);
  }

  public timeEnd(...args: unknown[]): void {
    Logger.calls.push(args);
  }

  public error(...args: unknown[]): void {
    Logger.calls.push(args);
  }
} 

export default Logger;