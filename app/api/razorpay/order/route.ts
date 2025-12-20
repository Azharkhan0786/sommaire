import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { plan } = await req.json();

  // ✅ Amount must be in PAISE
  const amount =
    plan === "BASIC" ? 90 * 100 : 900 * 100;

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `sommaire_${Date.now()}`,
  });

  return NextResponse.json(order);
}
