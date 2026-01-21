
import { GoogleGenAI } from "@google/genai";

// Use ai.models.generateContent to query GenAI with both the model name and prompt.
// Create a new GoogleGenAI instance right before making an API call to ensure it uses the correct key.

export const getSmartProductDescription = async (productName: string, category: string) => {
  try {
    // Initializing with the mandatory apiKey parameter from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a royal, luxury-themed marketing description for a leather ${category} named "${productName}". Focus on heritage, craftsmanship, and status. Keep it around 50 words.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    // Use response.text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini description error:", error);
    return null;
  }
};

export const getStyleAdvice = async (productName: string) => {
  try {
    // Initializing with the mandatory apiKey parameter from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give 3 royal fashion styling tips for wearing a luxury leather product: "${productName}". Format the output as a simple list.`,
      config: {
        temperature: 0.7,
      }
    });
    // Use response.text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini styling advice error:", error);
    return "Our concierge suggests pairing this with fine linen or bespoke tailoring.";
  }
};
