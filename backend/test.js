require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000",
    "X-Title": "Summarizer App"
  }
});

async function run() {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat", // موديل مجاني غالباً
      messages: [
        { role: "user", content: "Say hello in Arabic" }
      ]
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
}

run();