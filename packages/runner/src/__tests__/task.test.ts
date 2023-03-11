import {expect, jest, describe, it} from '@jest/globals';
import task from "../task.js";
import register from "../register.js";
import Logger from "../Logger.js";

jest.mock("../Logger");

describe("task", () => {
  it("should register new task", () => {
    const ls = jest.fn();
    task("ls",  ls);

    expect(register.get("ls")).toBeInstanceOf(Function);
  });

  it("should execute task function when run", async() => {
    const ls = jest.fn();
    task("ls",  ls);  
    
    const run = register.get("ls")!;
    await run();

    expect(Logger.calls).toMatchSnapshot();
    expect(ls).toHaveBeenCalled();
  });
});