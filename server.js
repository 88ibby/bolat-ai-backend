import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    status: "online",
    app: "Bolat Family APP AI Backend",
    endpoint: "/chat"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const message = String(req.body.message || "").trim();

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: "AI backend is running, but OPENAI_API_KEY is not set."
      });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      input: [
        {
          role: "system",
          content: "You are Bolat Family APP, a helpful private family assistant. Be practical, clear, safe, and concise."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.output_text || "I could not generate a response."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "AI backend error. Check the server logs and API key."
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Bolat AI Backend running on port ${port}`);
});
