import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Retrieve the 'isAdmin' cookie from the request
  const cookie = req.cookies.get('isAdmin');

  // Check if the cookie is 'true'
  if (cookie?.value === 'true') {
    return NextResponse.json({ isAdmin: true });
  }

  return NextResponse.json({ isAdmin: false }, { status: 401 });
}
