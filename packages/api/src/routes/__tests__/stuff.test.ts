import {
  expect,
  describe,
  it,
} from "@jest/globals";
import {createServer} from "../../server.js";

describe("GET `/status` route", () => {
  it("should respond with 401 if not authenticated", async() => {
    const server = await createServer();
    const response = await server.inject({
      method: "GET",
      url: "/api/v1/stuff",
    });
    expect(response.statusCode).toBe(401);
  });
});
