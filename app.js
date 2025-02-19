import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify({ data: "hello" }));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("server is running on 3000");
});
