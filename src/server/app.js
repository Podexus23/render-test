import http from "http";
import { getRouting, postRouting } from "./api.server.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "GET") getRouting(res, req.url);
  else if (req.method === "POST") postRouting(res, req);
  else {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ data: "hello" }));
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running on ${PORT}`);
});
