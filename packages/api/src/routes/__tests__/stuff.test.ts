import {
  expect,
  describe,
  afterAll,
  it,
} from "@jest/globals";
import fastify from "../../server.js";

describe("GET `/status` route", () => {
  afterAll(async() => fastify.close());

  it("should respond with 401 if not authenticated", (done) => {
    fastify.inject({
      method: "GET",
      url: "/api/v1/stuff",
    }, (err, response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});
