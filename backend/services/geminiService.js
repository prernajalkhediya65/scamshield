const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const analyzeScam = async (type, content) => {

    const prompt = `
    You are an expert scam detection assistant.

    Analyze the following ${type} for potential scams.

    Content: ${content}

    Return the response in JSON format:
    {
        "riskLevel": "LOW, MEDIUM or HIGH",
        "explanation": "Explain the result",
        "reasons": ["reason 1", "reason 2"],
        "recommendation": "Safety advice"
    }
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt
    });
let result = response.text;

result = result.replace(/```json/gi, "");
result = result.replace(/```/g, "");

return result.trim();
   
};

module.exports = analyzeScam;