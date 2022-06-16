const fs = require("fs");
const http = require("http");
const validTypes = [];

function start(client) {
  const server = http.createServer(function(req,res) {
    listen(req, res, client);
  });
  server.listen(5000, () => {
    console.log("Server running!");
  });
}

function listen(req, res, client) {
  if (req.method === "GET") {
    if (client.isReady()) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end("OK");
    } else {
      res.writeHead(503, {"Content-Type": "text/html"});
      res.end("Bot unavailable");
    }
  }
}

module.exports.start = start;