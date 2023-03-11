import {expect, describe, it} from '@jest/globals';

import register from "../register.js";
import parallel from "../parallel.js";


describe("parallel", () => {
  it("should execute tasks in parallel", async() => {
    const order: string[] = [];

    const task1 = async(): Promise<void> => new Promise((resolve) => setTimeout(() => {
      order.push("test1");
      resolve();
    }, 20));
    const task2 = async(): Promise<void> => new Promise((resolve) => setTimeout(() => {
      order.push("test2");
      resolve();
    }, 1));
    register.set("test1", task1);
    register.set("test2", task2);

    const tasks = parallel("test1", "test2");
    await tasks();

    expect(order).toEqual(["test2", "test1"]);
  });
});