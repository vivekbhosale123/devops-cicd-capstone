const test = require("node:test");
const assert = require("node:assert/strict");
const server = require("../app/server");

test("application endpoints", async (t) => {
  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  await t.test("home endpoint returns a welcome message", async () => {
    const response = await fetch(`${baseUrl}/`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(
      body.message,
      "Welcome to the DevOps Capstone App"
    );
  });

  await t.test("health endpoint returns ok", async () => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.status, "ok");
  });

  await t.test("unknown endpoint returns 404", async () => {
    const response = await fetch(`${baseUrl}/not-found`);
    assert.equal(response.status, 404);
  });

  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});
