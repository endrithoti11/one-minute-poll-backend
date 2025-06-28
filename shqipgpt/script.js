const responseDiv = document.getElementById('response');
const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('user-input');

async function askGemini() {
  const text = input.value.trim();
  if (!text) return;
  sendBtn.disabled = true;
  responseDiv.textContent = 'Duke u përgjigjur...';
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBIFBgkikl9y7L5V9SvcpuxYPuUKLl1hVI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    });
    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nuk u mor përgjigje.';
    responseDiv.textContent = answer;
  } catch (err) {
    responseDiv.textContent = 'Ndodhi një gabim.';
    console.error(err);
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener('click', askGemini);
