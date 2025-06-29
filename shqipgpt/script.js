const responseDiv = document.getElementById('response');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function askGemini() {
  const text = input.value.trim();
  if (!text) return;
  sendBtn.disabled = true;
  responseDiv.textContent = 'Duke u përgjigjur...';
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    });
    if (!res.ok) {
      throw new Error('Kërkesa dështoi');
    }
    const data = await res.json();
    responseDiv.textContent = data.reply || 'Nuk u mor përgjigje.';
  } catch (err) {
    responseDiv.textContent = `Ndodhi një gabim: ${err.message}`;
    console.error(err);
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener('click', askGemini);
