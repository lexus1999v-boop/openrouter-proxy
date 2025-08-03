const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "Ошибка: пустой ответ";
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка генерации", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
