import { GoogleGenAI } from "@google/genai";
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      console.log(body);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    });
  } else {
    res.writeHead(405);
    res.end("Method Not Allowed");
  }
});

console.log("Server is lestning in http://localhost:3000/");
server.listen(3000);