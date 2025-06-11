const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
const app = express();
const openaiKey = process.env.OPENAI_API_KEY;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let poll = {
  question: 'Is this poll helpful?',
  options: ['Yes', 'No'],
  votes: { Yes: 0, No: 0 }
};

app.get('/poll', (req, res) => {
  res.json({ question: poll.question, options: poll.options });
});

app.post('/poll', (req, res) => {
  const { question, options } = req.body;
  if (typeof question !== 'string' || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Invalid poll format' });
  }
  poll = {
    question,
    options,
    votes: options.reduce((acc, opt) => {
      acc[opt] = 0;
      return acc;
    }, {})
  };
  res.json({ success: true });
});

app.post('/poll/vote', (req, res) => {
  const { option } = req.body;
  if (poll.votes[option] !== undefined) {
    poll.votes[option]++;
    return res.json({ success: true });
  }
  res.status(400).json({ error: 'Invalid option' });
});

app.get('/poll/results', (req, res) => {
  res.json(poll.votes);
});

app.post('/poll/reset', (req, res) => {
  Object.keys(poll.votes).forEach(key => {
    poll.votes[key] = 0;
  });
  res.json({ success: true });
});

app.post('/ai/suggest', async (req, res) => {
  const { topic } = req.body;
  if (typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'Invalid topic' });
  }
  if (!openai) {
    return res.status(503).json({ error: 'AI service not configured' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Suggest a one-sentence poll question about ${topic}` }
      ],
      max_tokens: 20
    });
    const question = completion.choices[0].message.content.trim();
    res.json({ question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI request failed' });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
