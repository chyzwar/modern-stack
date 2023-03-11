import pc from "picocolors"

class Logger {
  public static calls: unknown[][];
 
  private readonly taskName: string;

  public constructor(taskName: string) {
    this.taskName = taskName;
  }

  public time(label: string): void {
    console.time(pc.green(`[${this.taskName}] ${label}`));
  }

  public timeEnd(label: string): void {
    console.timeEnd(pc.green(`[${this.taskName}] ${label}`));
  }

  public log(message = ""): void {
    console.log(`[${pc.green(this.taskName)}] ${message}`);
  }

  public warn(message = "", meta: unknown = ""): void {
    console.warn(pc.yellow(`[${this.taskName}] ${message}`), meta);
  }

  public error(message = "", meta: unknown = ""): void {
    console.log(`${pc.red(`[${this.taskName}]`)} ${message}`, meta);
  }

  public info(message = ""): void {
    console.log(`${pc.green(`[${this.taskName}]`)} ${message}`);
  }
}


export default Logger;