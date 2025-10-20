import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import http from "http";

const allowedOrigins = ["chrome-extension://ojlcgjlkdobhdjnbknhcfghanipakeme"];
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function optimizeText(inputText) {
  const prompt = `You are a top prompt engineer and text optimizer.
Infer the intended prompt behind this text, rewrite it optimally,
and generate exactly 3 improved versions. Return strict JSON only:

{
  "versions": ["...","...","..."]
}

Here is the text: """${inputText}"""`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url === "/" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);

    req.on("end", async () => {
      try {
        const result = await optimizeText(body);

        const match = result.match(/\{[\s\S]*\}/);
        const jsonResult = match ? JSON.parse(match[0]) : { error: "Invalid AI output" };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(jsonResult)); 
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });

  } else {
    res.writeHead(405);
    res.end("Method Not Allowed");
  }
});

console.log("Server is listening at http://localhost:3000/");
server.listen(3000);