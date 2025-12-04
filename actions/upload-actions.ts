"use server";
import { generateSummaryfromOpenAI } from "@/lib/openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { tr } from "zod/v4/locales";

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

// ----------------------------------
// Save summary into database
// ----------------------------------
async function savePDFSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();

    await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      )
      VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      );
    `;

    return { success: true };
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw error;
  }
}

// ----------------------------------
// Store summary action (called by client)
// ----------------------------------
export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const { userId: loggedInUserId } = await auth();

    if (!loggedInUserId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const savedSummary = await savePDFSummary({
      userId: loggedInUserId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: savedSummary,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
}
