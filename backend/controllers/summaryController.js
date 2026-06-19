const Summary = require("../models/summary");
const OpenAI = require("openai");

const summarizeText = async (req, res) => {
  try {
    // 🔐 تأكد أن المفتاح موجود
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OPENROUTER_API_KEY is not configured in .env file",
      });
    }

    // 🧠 إنشاء OpenAI instance بعد التأكد من المفتاح
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const { originalText } = req.body;

    if (!originalText) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const prompt = `
Summarize the following article in exactly 5 key points.
- Write in English.
- Do not include an introduction or conclusion.
- Each point must be on a separate line.

Article:
${originalText}
`;

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const generatedText = response.choices[0].message.content;

    // ✂️ تنظيف النتائج وتحويلها إلى array
    const summaryPoints = generatedText
      .split("\n")
      .map((line) =>
        line.replace(/^\d+\.|\-|\*/g, "").trim()
      )
      .filter((line) => line.length > 0);

    // 💾 حفظ في قاعدة البيانات
    const savedSummary = await Summary.create({
      originalText,
      summaryText: summaryPoints,
    });

    return res.status(201).json({
      success: true,
      data: savedSummary,
    });

  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { summarizeText };