"use server";
import { generateSummaryfromOpenAI } from "@/lib/openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { _success } from "zod/v4/core";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "No upload response",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "No upload response",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary;
    try {
      summary = await generateSummaryfromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      //call gemini if any error or rate limit error arises
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
  } catch (err) {
    console.error("Error extracting PDF text:", err);
    return {
      success: false,
      message: "Error extracting PDF text",
      data: null,
    };
  }
}
