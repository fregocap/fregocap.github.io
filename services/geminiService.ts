
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";


export const getFinancialAdvice = async (userStats: string) => {
  if (!API_KEY || API_KEY === 'PLACEHOLDER_KEY_REMOVED_FOR_SECURITY') {
    console.warn("Gemini API Key is missing or invalid.");
    return "AI Financial Analysis is currently disabled for security maintenance. Please check back later.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
    return "I'm sorry, I couldn't process your analysis at this time. Please try again later.";
  }
};


