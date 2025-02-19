import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.end(JSON.stringify({ data: "hello" }));
});

server.listen(3000, () => {
  console.log("server is running on 3000");
});
