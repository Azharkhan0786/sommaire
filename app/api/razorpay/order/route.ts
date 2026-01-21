import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Validate environment variables
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    console.log("=== RAZORPAY DEBUG ===");
    console.log("KEY_ID exists:", !!keyId);
    console.log("KEY_SECRET exists:", !!keySecret);
    console.log("KEY_ID length:", keyId?.length || 0);
    console.log("KEY_SECRET length:", keySecret?.length || 0);

    if (!keyId || !keySecret) {
      console.error("❌ Razorpay credentials missing");
      return NextResponse.json(
        { success: false, message: "Razorpay credentials missing", debug: { keyId: !!keyId, keySecret: !!keySecret } },
        { status: 500 }
      );
    }

    console.log("✅ Credentials found, initializing Razorpay...");

    // Initialize Razorpay with validated credentials
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    console.log("✅ Razorpay client initialized");

    const body = await req.json();
    const { plan } = body;

    console.log("Plan received:", plan);

    if (!plan) {
      return NextResponse.json(
        { success: false, message: "Plan parameter is required" },
        { status: 400 }
      );
    }

    // ✅ Amount must be in PAISE
    const amount = plan === "BASIC" ? 90 * 100 : 900 * 100;

    console.log("Creating order with amount:", amount, "paise");

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `sommaire_${Date.now()}`,
    });

    console.log("✅ Order created successfully:", order.id);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("❌ Razorpay order creation error:");
    console.error("Error message:", error?.message);
    console.error("Error code:", error?.code);
    console.error("Full error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create Razorpay order",
        error: error?.code || "UNKNOWN",
      },
      { status: 500 }
    );
  }
}
