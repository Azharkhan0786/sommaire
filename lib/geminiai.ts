import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
      systemInstruction: SUMMARY_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 20000,   // ⬅ FIX 1: Increase output limit
      },
    });

    const prompt = `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;

    // ⬅ FIX 2: Extract text manually — avoids EMPTY RESPONSE bug
    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    const fullText = parts
      .map((p: any) => p.text || "")
      .join("")
      .trim();

    if (!fullText) {
      console.error("Gemini Raw Response:", response);
      throw new Error("Empty response from Gemini API (after manual extraction)");
    }

    return fullText;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
