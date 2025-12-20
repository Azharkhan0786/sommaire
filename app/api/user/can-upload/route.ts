import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";

export async function GET() {
  console.log("Can-upload API called");
  try {
    const { userId } = await auth();
    console.log("Auth userId:", userId);
    const user = await currentUser();
    console.log("Current user:", user ? "exists" : "null");

    if (!userId || !user) {
      console.log("User not authenticated");
      return NextResponse.json({ canUpload: false, message: "Not authenticated" }, { status: 401 });
    }

    const sql = await getDbConnection();

    // Ensure user exists in database
    const email = user.emailAddresses[0]?.emailAddress || "unknown@example.com";
    const fullName = user.fullName || null;

    const existing = await sql`
      SELECT * FROM users WHERE user_id = ${userId};
    `;

    if (existing.length === 0) {
      await sql`
        INSERT INTO users (user_id, email, full_name)
        VALUES (${userId}, ${email}, ${fullName});
      `;
    }

    // Get user's plan
    const userRecord = await sql`
      SELECT price_id FROM users WHERE user_id = ${userId}
    `;

    const priceId = userRecord[0].price_id;

    // If pro, unlimited
    if (priceId === "pro") {
      return NextResponse.json({ canUpload: true });
    }

    // If basic or no plan (default to basic for new users)
    if (priceId === "basic" || priceId === null) {
      const summaries = await sql`
        SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}
      `;

      const count = summaries[0].count;

      if (count >= 5) {
        return NextResponse.json({
          canUpload: false
        });
      } else {
        return NextResponse.json({ canUpload: true });
      }
    }

    // If no plan, assume basic or something
    return NextResponse.json({ canUpload: false, message: "No active plan" });

  } catch (error) {
    console.error("Error checking upload limit:", error);
    return NextResponse.json({ canUpload: false, message: "Error checking upload limit" }, { status: 500 });
  }
}