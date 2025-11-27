"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";

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

    return {
      success: true,
      message: "PDF text extracted successfully",
      data: {
        userId,
        fileName,
        pdfUrl,
        text: pdfText,
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
