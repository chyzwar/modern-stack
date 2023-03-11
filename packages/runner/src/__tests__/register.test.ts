import { describe, expect, it } from "@jest/globals";
import register from "../register.js";

describe("register", () => {
  it("should be an Map", () => {
    expect(register).toBeInstanceOf(Map);
  });
});