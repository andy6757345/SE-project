const request = require("supertest");
const http = require("http");

// Import your app as a module
const app = require("../server.cjs");

describe("Custom Unit Tests for Server", () => {
  let server;

  beforeAll((done) => {
    // Manually create an HTTP server for the app
    server = http.createServer(app);
    server.listen(3001, () => done());
  });

  afterAll((done) => {
    // Close the server after tests
    server.close(() => done());
  });

  it("should serve the login page", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("<html"); // Check for basic HTML structure
  });

  it("should register a new user", async () => {
    const res = await request(server).post("/register").send({
      username: "testUser",
      password: "testPass",
    });
    expect(res.status).toBe(200);
    expect(res.text).toContain("Registration successful");
  });

  it("should not log in with invalid credentials", async () => {
    const res = await request(server).post("/login").send({
      username: "invalidUser",
      password: "invalidPass",
    });
    expect(res.status).toBe(200);
    expect(res.text).toContain("Invalid credentials");
  });
});
