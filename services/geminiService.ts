import { GoogleGenAI, Type } from "@google/genai";

export const getFinancialAdvice = async (userStats: string, apiKey: string) => {
  if (!apiKey || apiKey.trim() === '') {
    console.warn("Gemini API Key is missing.");
    return "AI Financial Analysis requires a valid API key. Please provide one in the input field.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are a professional financial independence advisor for labfab.io. 
      Analyze these user stats and provide a clear, 3-point personalized feedback plan for their early retirement journey: ${userStats}. 
      Focus on actionable steps for saving, investing, and tax optimization. Maintain a professional and encouraging tone.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't process your analysis at this time. Please check your API key and try again.";
  }
};
