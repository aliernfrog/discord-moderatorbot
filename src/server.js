const fs = require("fs");
const http = require("http");
const validTypes = [];
let shouldBeReady = false;

function start(client) {
  const server = http.createServer(function(req,res) {
    listen(req, res, client);
  });
  server.listen(5000, () => {
    console.log("Server running!");
  });
  setTimeout(() => shouldBeReady = true, 5000);
}

function listen(req, res, client) {
  if (req.method === "GET") {
    if (client.isReady() || !shouldBeReady) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end("OK");
    } else {
      res.writeHead(503, {"Content-Type": "text/html"});
      res.end("Bot unavailable, restarting");
      process.kill(1);
    }
  }
}

module.exports.start = start;