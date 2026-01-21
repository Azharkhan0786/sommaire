import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDbConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const sql = await getDbConnection();

    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = user.id;
    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "User email not found" },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,   // "BASIC" | "PRO"
      amount,
    } = await req.json();

    // 🔐 1. VERIFY SIGNATURE
    let signatureValid = false;
    if (process.env.NODE_ENV === 'production') {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest("hex");
      signatureValid = expectedSignature === razorpay_signature;
    } else {
      // Skip signature check in development
      signatureValid = true;
    }

    if (!signatureValid) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // 🔴 🔴 🔴 THIS IS THE EXACT PLACE 🔴 🔴 🔴
    // ✅ 2. INSERT USER IF NOT EXISTS
    await sql`
      INSERT INTO users (user_id, email)
      VALUES (${userId}, ${email})
      ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email
    `;

    // ✅ 3. UPDATE USER PLAN IN DB
    await sql`
      UPDATE users
      SET
        price_id = ${plan === "BASIC" ? "basic" : "pro"},
        status = 'active',
        updated_at = NOW()
      WHERE user_id = ${userId}
    `;

    // ✅ 3. STORE PAYMENT RECORD
    await sql`
      INSERT INTO payments (
        amount,
        status,
        stripe_payment_id,
        price_id,
        user_email
      )
      VALUES (
        ${amount},
        'success',
        ${razorpay_payment_id},
        ${plan === "BASIC" ? "basic" : "pro"},
        ${email}
      )
    `;

    // 🔄 4. REVALIDATE UI
    revalidatePath("/");
    revalidatePath("/dashboard/summaries");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}