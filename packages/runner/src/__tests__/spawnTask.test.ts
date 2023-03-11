import {expect, jest, describe, it} from '@jest/globals';
import spawnTask from "../spawnTask.js";
import register from "../register.js";
import SpawnError from "../SpawnError.js";

jest.mock("../Logger");

describe("spawnTask", () => {
  it("should register new task", () => {
    spawnTask("ls", "ls", ["-la"]);

    expect(register.get("ls")).toBeInstanceOf(Function);
  });

  it("should handle ENOENT", async() => {
    spawnTask("invalid", "invalid");

    const task = register.get("invalid")!;
    
    await expect(task()).rejects.toThrowError(
      new SpawnError("Spawn Task closed with non-zero exit code", -2, "invalid")
    );
  });
});