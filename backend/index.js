import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import http from "http";

const allowedOrigins = ["chrome-extension://ffgihbnbmmgjkikbocekjgcmddpbnbmk"];
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function optimizeText(inputText, settings) {
  const prompt = `You are a top prompt engineer and text optimizer.
Use the following user preferences:
${JSON.stringify(settings)}

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
        // Parse JSON from the request
        const data = JSON.parse(body);
        const inputText = data.input;
        const settings = data.settings || {};

        const resultText = await optimizeText(inputText, settings);

        // Extract JSON from AI output
        const match = resultText.match(/\{[\s\S]*\}/);
        const jsonResult = match ? JSON.parse(match[0]) : { error: "Invalid AI output" };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(jsonResult));

        console.log("AI Response:", JSON.stringify(jsonResult));

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
