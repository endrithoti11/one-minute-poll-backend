const request = require('supertest');
const app = require('../index');

describe('Poll API', () => {
  it('retrieves current poll', async () => {
    const res = await request(app).get('/poll');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('question');
    expect(Array.isArray(res.body.options)).toBe(true);
  });

  it('creates a new poll', async () => {
    const newPoll = { question: 'Test?', options: ['A', 'B'] };
    const res = await request(app).post('/poll').send(newPoll);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
    const pollRes = await request(app).get('/poll');
    expect(pollRes.body.question).toBe('Test?');
    expect(pollRes.body.options).toEqual(['A', 'B']);
  });

  it('votes and gets results', async () => {
    await request(app).post('/poll/vote').send({ option: 'A' });
    const res = await request(app).get('/poll/results');
    expect(res.body).toEqual({ A: 1, B: 0 });
  });

  it('resets results', async () => {
    const res = await request(app).post('/poll/reset');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
    const results = await request(app).get('/poll/results');
    expect(results.body).toEqual({ A: 0, B: 0 });
  });
});
