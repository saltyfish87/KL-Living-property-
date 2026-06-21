import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const _filename = typeof import.meta !== "undefined" && import.meta.url
  ? fileURLToPath(import.meta.url)
  : (typeof __filename !== "undefined" ? __filename : "");
const _dirname = _filename ? path.dirname(_filename) : (typeof __dirname !== "undefined" ? __dirname : process.cwd());

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize secure server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Route proxying the content generation call
  app.post("/api/describe-image", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "Image URL is required" });
      }

      const prompt = "Describe this property interior or exterior image in one short, elegant sentence suitable for a luxury real-estate website. Focus on materials, mood, or specific features. Do not use 'As an AI' or 'This image shows'. Keep it under 20 words.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { text: prompt },
          { text: `Image URL: ${url}` }
        ]
      });

      const description = response.text?.trim() || "";
      res.json({ description });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI description." });
    }
  });

  // API Route to dynamically translate structured real-estate objects using Gemini
  app.post("/api/translate-object", async (req, res) => {
    const { obj, targetLanguage } = req.body;
    try {
      if (!obj) {
        return res.status(400).json({ error: "Object data is required" });
      }
      if (!targetLanguage || targetLanguage === "en") {
        return res.json({ translatedObj: obj });
      }

      const prompt = `You are an expert multilingual real estate translator specializing in translating high-end properties.
Translate the text values in this JSON object from English to the target language: "${targetLanguage}".

Rules to follow:
1. STRICTLY KEEP all brand/project names in their original English form—DO NOT translate, transliterate, translate into Chinese characters, phonetic spellings, or alter them in any way. These project names include:
   "The Aldenz", "Queenswoodz", "Kingswoodz", "Veladaz", "Vividz", "Axis Tower", "Brixton Tower", "Dover Tower", "The Oaka Residences", "Ren Residence", "Ayanna Resort Residences", "Aras Residence", "The Maple Residence", "M Aspira", "Dwi Aurora", "Central Park Damansara", "EXSIM", "EXSIM Group"
2. KEEP all keys, IDs, URLs, numbers, dates, metric abbreviations (e.g. sqft, m, km), and empty arrays intact.
3. Translate all descriptions, marketing taglines, unit features, layouts, specs (e.g. bed, bath, sqft), locations (such as Damansara Perdana, Bukit Jalil, etc.), developer descriptions, and surrounding amenities into a highly natural, local, prestigious and elegant wording of "${targetLanguage}" suitable for a luxury real-estate portal.
4. Return ONLY the translated JSON object. Do not include conversational remarks, quotes, or markdown format wrappers (like \`\`\`json). Return a single, valid, parsable JSON string.

JSON object to translate:
${JSON.stringify(obj, null, 2)}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { text: prompt }
        ]
      });

      let responseText = response.text?.trim() || "";
      
      // Strip any markdown code wrapper if returned
      if (responseText.startsWith("```json")) {
        responseText = responseText.substring(7);
      } else if (responseText.startsWith("```")) {
        responseText = responseText.substring(3);
      }
      if (responseText.endsWith("```")) {
        responseText = responseText.substring(0, responseText.length - 3);
      }
      responseText = responseText.trim();

      try {
        const translatedObj = JSON.parse(responseText);
        res.json({ translatedObj });
      } catch (jsonErr) {
        console.error("Gemini output translation parse error: trying custom extraction. Raw response was:", responseText, jsonErr);
        // Fallback: If parse fails, return the original object
        res.json({ translatedObj: obj });
      }
    } catch (err: any) {
      console.error("Translation object API Error:", err);
      res.json({ translatedObj: obj });
    }
  });

  // Serve Client SPA files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
