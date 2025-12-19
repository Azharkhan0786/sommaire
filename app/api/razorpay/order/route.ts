// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(req: Request) {
//   const { plan } = await req.json();

//   // ✅ Amount must be in PAISE
//   const amount =
//     plan === "BASIC" ? 90 * 100 : 900 * 100;

//   const order = await razorpay.orders.create({
//     amount,
//     currency: "INR",
//     receipt: `sommaire_${Date.now()}`,
//   });

//   return NextResponse.json(order);
// }
import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDbConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,   // "BASIC" | "PRO"
      email,  // user email
      amount,
    } = await req.json();

    // 🔐 1. VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // 🔴 🔴 🔴 THIS IS THE EXACT PLACE 🔴 🔴 🔴
    // ✅ 2. UPDATE USER PLAN IN DB (THIS IS WHAT YOU ASKED)
    const sql = await getDbConnection();

    await sql`
      UPDATE users
      SET
        price_id = ${plan === "BASIC" ? "basic" : "pro"},
        status = 'active',
        updated_at = NOW()
      WHERE email = ${email}
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
    revalidatePath("/dashboard");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
