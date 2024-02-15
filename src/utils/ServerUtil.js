import { createServer } from "http";
let shouldBeReady = false;

const port = process.env.PORT;

export function start(client) {
  if (!port) return console.warn("Port not specified, not starting server");
  const server = createServer(function(req,res) {
    listen(req, res, client);
  });
  server.listen(port, () => {
    console.log(`Server running on: ${port}`);
  });
  setTimeout(() => {
    shouldBeReady = true;
    if (!client.isReady()) process.kill(1);
  }, 10000);
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