const express = require('express');
const router = express.Router();

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
const apiKey = process.env.GEMINI_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt i pavlefshëm' });
  }
  if (!apiKey) {
    return res.json({ reply: 'GEMINI_API_KEY mungon' });
  }
  try {
    const gRes = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await gRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nuk ka përgjigje.';
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kërkesa dështoi' });
  }
});

module.exports = router;
