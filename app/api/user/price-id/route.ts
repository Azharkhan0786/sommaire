import { NextResponse } from "next/server";
import { getPriceId } from "@/lib/user";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const priceId = await getPriceId(email);

  return NextResponse.json({ priceId });
}