import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'https://neurovin.ru',
        'X-Title': 'AvitoTools Generator'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Ошибка при запросе к OpenRouter:', error);
    res.status(500).json({ error: 'Ошибка при запросе к OpenRouter' });
  }
});

app.listen(port, () => {
  console.log(`OpenRouter Proxy listening on port ${port}`);
});