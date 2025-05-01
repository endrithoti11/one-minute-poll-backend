const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let votes = { Yes: 0, No: 0 };

app.post('/poll/vote', (req, res) => {
  const { option } = req.body;
  if (votes[option] !== undefined) {
    votes[option]++;
  }
  res.json({ success: true });
});

app.get('/poll/results', (req, res) => {
  res.json(votes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

