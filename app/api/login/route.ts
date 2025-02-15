import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Get admin credentials from environment variables
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    const response = NextResponse.json({ message: "Login successful" });

    // Set a cookie for admin session
    response.cookies.set("admin", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { message: "Invalid email or password" },
    { status: 401 }
  );
}
