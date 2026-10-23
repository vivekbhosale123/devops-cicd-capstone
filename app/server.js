const http = require("node:http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: "Welcome to the DevOps Capstone App"
    }));
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: "ok"
    }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    error: "Not Found"
  }));
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
  });
}

module.exports = server;
