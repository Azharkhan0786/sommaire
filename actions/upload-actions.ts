

"use server";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { auth,currentUser } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

// -----------------------------
// GENERATE PDF SUMMARY
// -----------------------------
export async function generatePdfSummary(uploadResponse: any) {
  if (!uploadResponse) {
    return { success: false, message: "No upload response", data: null };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, message: "PDF URL missing", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    const summary = await generateSummaryFromGemini(pdfText);

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated",
      data: { summary, fileName },
    };
  } catch (err) {
    console.error("Error extracting PDF:", err);
    return {
      success: false,
      message: "Error reading PDF",
      data: null,
    };
  }
}

// ----------------------------------------------------
// NEW FUNCTION ADDED HERE 👇
// Ensures the Clerk user exists in `users` table
// Prevents FOREIGN KEY ERRORS when saving summaries
// ----------------------------------------------------
async function ensureUserExists(userId: string, user: any) {
  const sql = getDbConnection();

  const email = user?.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
  const fullName = user?.fullName || null;

  // Check if user already exists
  const existing = await sql`
    SELECT * FROM users WHERE user_id = ${userId};
  `;

  if (existing.length === 0) {
    await sql`
      INSERT INTO users (user_id, email, full_name)
      VALUES (${userId}, ${email}, ${fullName});
    `;
  }
}


// -----------------------------
// SAVE PDF SUMMARY TO DATABASE
// -----------------------------
async function savePDFSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = getDbConnection();

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

// -----------------------------
// STORE SUMMARY ACTION (called by FE)
// -----------------------------
export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const { userId: loggedInUserId } = await auth();
    const user = await currentUser(); // ⭐ FIX: get full Clerk user details

    if (!loggedInUserId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    // ⭐ FIXED: pass full Clerk user object to ensureUserExists()
    await ensureUserExists(loggedInUserId, user);

    const savedSummary = await savePDFSummary({
      userId: loggedInUserId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    return {
      success: true,
      message: "PDF saved successfully",
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


