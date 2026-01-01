
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
    const text = response.text;
    return JSON.parse(text || '["#40E0D0", "#FF7F50", "#F4E7D3"]');
  } catch (e) {
    console.error("Palette extraction failed:", e);
    return ["#40E0D0", "#FF7F50", "#F4E7D3"];
  }
}

/**
 * Regenerates a product image variant using the Gemini image editing model.
 * Strict compliance with 8.4: No humans, no avatars, no faces. Scene-first UGC only.
 */
export async function regenerateVariant(originalImageUrl: string, prompt: string): Promise<string | null> {
  try {
    const base64Data = await urlToBase64(originalImageUrl);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/png' } },
          { text: `Edit this product photo: ${prompt}. 
          
          STRICT GUARDRAILS:
          - Maintain the exact product identity and shape.
          - NO HUMANS, NO FACES, NO AVATARS.
          - NO PEOPLE in the background or foreground.
          - Focus solely on the environment, professional lighting, and commercial background.
          - Output a high-fidelity image that looks like professional UGC/studio photography.` }
        ]
      }
    });

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
