# One Minute Poll Backend

This simple Express server provides a quick API for creating and voting on a single poll.

## Endpoints

### `GET /poll`
Retrieve the current poll question and available options.

### `POST /poll`
Create a new poll. The request body should include a `question` string and an `options` array with at least two options:

```json
{
  "question": "Your question here",
  "options": ["Yes", "No"]
}
```

Creating a new poll resets any previous results.

### `POST /poll/vote`
Vote for an option. The body must contain an `option` field with one of the poll options:

```json
{
  "option": "Yes"
}
```

### `GET /poll/results`
Get the current vote counts for each option.

### `POST /poll/reset`
Reset all vote counts to zero without changing the poll question or options.

### `POST /ai/suggest`
Generate a poll question using OpenAI based on a provided `topic`:

```json
{
  "topic": "technology"
}
```

Set the `OPENAI_API_KEY` environment variable to enable this endpoint.

## Running the server

Install dependencies and start the server on port `3000`:

```bash
npm install
npm start
```

The server port can be changed with the `PORT` environment variable.
Provide `OPENAI_API_KEY` to enable the AI-powered suggestion endpoint.

## ShqipGPT Frontend

The `shqipgpt` folder contains a small frontend chatbot.
Set the `GEMINI_API_KEY` environment variable for the server.
The frontend sends user prompts to `/api/ask`, which in turn calls the Gemini API
and returns the reply.
