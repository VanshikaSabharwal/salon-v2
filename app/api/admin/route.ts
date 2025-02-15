import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("admin");

  if (cookie?.value === "true") {
    return NextResponse.json({ isAdmin: true });
  }

  return NextResponse.json({ isAdmin: false }, { status: 401 });
}
