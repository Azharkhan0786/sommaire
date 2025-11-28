import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryfromOpenAI(pdfText: string) {
  try {
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "system",
            content: SUMMARY_SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: `Transform this document into an engaging ,easy-to-read summary with contextually relevant emojis and proprer markdown formatting:\n\n' + ${pdfText}`,
        },
    ],
    max_output_tokens: 115000,
});

    return response.output_text;
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error("Rate limit exceeded");
      await new Promise((resolve)=>setTimeout(resolve,2000));
    }
    throw error;
  } // ✔ correct way
}
