import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));


const client = new Groq({ apiKey: "" });

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
  }

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that only responds to greetings (hi, hello, bye) and provides agriculture-related knowledge. If the question is unrelated, politely say 'I can only answer agriculture-related questions.'"
        },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});


app.listen(3000, () => console.log("Server running on port 3000"));

