import {
  expect,
  jest,
  describe,
  it,
} from "@jest/globals";
import {createServer} from "../../server.js";
import sequelize from "../../sequelize.js";

describe("GET `/status` route", () => {


  it("should respond with status connected true", async() => {
    // @ts-expect-error TODO: test look into better way
    sequelize.authenticate = jest.fn().mockResolvedValueOnce();
    const fastify = await createServer();
    const response = await fastify.inject({
      method: "GET",
      url: "/api/v1/status",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(response.json()).toEqual({
      uptime: expect.any(Number),
      db: {
        connected: true,
      },
    });
  });

  it("should respond with status error message for db", async() => {
    // @ts-expect-error TODO: test look into better way
    sequelize.authenticate = jest.fn().mockRejectedValueOnce(new Error("Failed to auth"));

    const fastify = await createServer();
    const response = await fastify.inject({
      method: "GET",
      url: "/api/v1/status",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(response.json()).toEqual({
      uptime: expect.any(Number),
      db: {
        connected: false,
      },
    });
  });
});
