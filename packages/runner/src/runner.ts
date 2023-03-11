#! /usr/bin/env node
 
import series from "./series.js";
import Logger from "./Logger.js";
import type SpawnError from "./SpawnError.js";

const logger = new Logger("runner");

async function handle(argv: string[]): Promise<void> {
  try {
    await import(`${process.cwd()}/runner.config.js`);
  }
  catch (error: unknown) {
    logger.error(`Failed loading configuration ${error}`);
  }

  const label = `Completed tasks: ${argv.join(", ")} in`;
  
  argv.length > 1 && logger.time(label);
  await series(...argv)();
  argv.length > 1 && logger.timeEnd(label);
} 
/**
 * Handle exceptions
 */
process.on("uncaughtException", (error) => {
  logger.error("uncaughtException", error);
});

process.on("unhandledRejection", (signal) => {
  logger.error("unhandledRejection", signal);
});


// eslint-disable-next-line @typescript-eslint/no-magic-numbers
handle(process.argv.slice(2, 3))
  .catch((info: SpawnError) => {
    logger.error(`Failed with code: ${info.code} on task: <${info.taskName}>`);
  });
  
