async function loadPoll() {
  const res = await fetch('/poll');
  const poll = await res.json();
  document.getElementById('question').textContent = poll.question;
  const form = document.getElementById('vote-form');
  form.innerHTML = '';
  poll.options.forEach(opt => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = opt;
    label.appendChild(input);
    label.append(' ' + opt);
    form.appendChild(label);
  });
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Vote';
  form.appendChild(submit);
}

document.getElementById('vote-form').addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const option = data.get('option');
  if (!option) return;
  await fetch('/poll/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  });
  alert('Vote submitted!');
});

document.getElementById('show-results').addEventListener('click', async () => {
  const res = await fetch('/poll/results');
  const results = await res.json();
  document.getElementById('results').textContent = JSON.stringify(results, null, 2);
});

document.getElementById('reset-poll').addEventListener('click', async () => {
  await fetch('/poll/reset', { method: 'POST' });
  await loadPoll();
});

document.getElementById('create-form').addEventListener('submit', async e => {
  e.preventDefault();
  const question = document.getElementById('new-question').value;
  const optionInputs = document.querySelectorAll('#create-form .option');
  const options = Array.from(optionInputs).map(i => i.value).filter(Boolean);
  const res = await fetch('/poll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, options })
  });
  if (res.ok) {
    await loadPoll();
    e.target.reset();
  } else {
    alert('Failed to create poll');
  }
});

document.getElementById('add-option').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'option';
  input.placeholder = 'Option';
  document.getElementById('create-form').insertBefore(input, document.getElementById('add-option'));
});

document.getElementById('ai-form').addEventListener('submit', async e => {
  e.preventDefault();
  const topic = document.getElementById('topic').value;
  const res = await fetch('/ai/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic })
  });
  if (res.ok) {
    const data = await res.json();
    document.getElementById('ai-question').textContent = data.question;
    document.getElementById('new-question').value = data.question;
  } else {
    document.getElementById('ai-question').textContent = 'AI suggestion failed';
  }
});

loadPoll();
