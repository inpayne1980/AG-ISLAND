
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Extracts dominant color palette from an image using Gemini
 */
export async function extractPalette(base64Data: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/png' } },
          { text: "Extract the 3 most dominant colors from this product image. Return them as a JSON array of hex codes." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    // Access the .text property directly (do not call as a function)
    const text = response.text;
    return JSON.parse(text || '["#6366f1", "#10b981", "#8b5cf6"]');
  } catch (e) {
    console.error("Palette extraction failed:", e);
    return ["#6366f1", "#10b981", "#8b5cf6"];
  }
}

/**
 * Regenerates a product image variant using the Gemini image editing model
 */
export async function regenerateVariant(originalImageUrl: string, prompt: string): Promise<string | null> {
  try {
    const base64Data = await urlToBase64(originalImageUrl);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/png' } },
          { text: `Edit this product photo: ${prompt}. Maintain identity, improve lighting/background. Output the modified image.` }
        ]
      }
    });

    // Iterate through candidates and parts to find the generated image data
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}
