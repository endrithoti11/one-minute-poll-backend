const responseDiv = document.getElementById('response');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function handleSubmit() {
const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('user-input');

const API_KEY = document.querySelector('meta[name="gemini-api-key"]').content;
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

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
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {

    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBIFBgkikl9y7L5V9SvcpuxYPuUKLl1hVI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    });
    if (!res.ok) {
      throw new Error(`Kërkesa dështoi: ${res.status}`);
    }
    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nuk u mor përgjigje.';
    responseDiv.textContent = answer;
  } catch (err) {
    responseDiv.textContent = `Ndodhi një gabim: ${err.message}`;

    responseDiv.textContent = 'Ndodhi një gabim.';
    console.error(err);
  } finally {
    sendBtn.disabled = false;
  }
}
sendBtn.addEventListener('click', askGemini);
