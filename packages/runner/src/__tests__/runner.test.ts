import {resolve} from "path";
import {expect, jest, describe, it} from '@jest/globals';
import Logger from "../Logger.js";

jest.mock("../Logger");

describe("runner", () => {
  it("should load configuration form runner.config.js", async() => {
    jest.spyOn(process, "cwd").mockImplementationOnce(() => {
      return resolve(__dirname, "..", "__fixtures__");
    });
    await import("../runner.js");

    expect(Logger.calls).toMatchSnapshot();
  });
});