
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRomanticMessage = async (role: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tuliskan satu kalimat romantis, pendek, dan manis untuk seorang ${role === 'Suami' ? 'Istri dari Suaminya' : 'Suami dari Istrinya'} yang sedang menjalani hubungan jarak jauh. Gunakan Bahasa Indonesia yang lembut dan puitis. Jangan gunakan kutipan, langsung saja kalimatnya.`,
    });
    return response.text || "Aku merindukanmu setiap detik.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Jarak hanyalah angka, hatiku selalu bersamamu.";
  }
};
