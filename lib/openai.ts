import OpenAI from "openai";

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
            content: '',
        },
    ],
});

    return response.output_text;
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    throw error;
  } // ✔ correct way
}
