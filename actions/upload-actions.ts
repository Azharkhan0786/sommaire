"use server";
import { generateSummaryfromOpenAI } from "@/lib/openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { _success } from "zod/v4/core";
import { generateSummaryFromGemini } from "@/lib/geminiai";

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
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      //call gemini if any error or rate limit error arises
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI rate limit exceeded",
            geminiError
          );
          throw new Error("Both OpenAI and Gemini API calls failed");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF summary generated successfully",
      data: {
        summary,
      },
    };
  } catch (err) {
    console.error("Error extracting PDF text:", err);
    return {
      success: false,
      message: "Error extracting PDF text",
      data: null,
    };
  }
}

