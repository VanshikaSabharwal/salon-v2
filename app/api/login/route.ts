import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can replace with another service (e.g., SendGrid, Mailgun)
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password or application-specific password
  },
});

// Function to send reset password email using Nodemailer
async function sendResetEmail(email: string, resetLink: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email
    to: email,                    // Receiver email
    subject: "Password Reset Request for K Style Professional Salon Website",
    text: `To reset your password, please click the following link: ${resetLink}`,
    html: `<p>To reset your password, please click the following link: <a href="${resetLink}">Reset Password</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    throw new Error("Failed to send reset email");
  }
}

// User Login

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Query the users table to find the user by email
  const { data, error } = await supabase
    .from('users')
    .select('id, email, password') // Only select necessary fields
    .eq('email', email)
    .single(); // Fetch a single user with the given email

  if (error || !data) {
    return NextResponse.json(
      { message: "Invalid email or user not found." },
      { status: 400 }
    );
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid password." },
      { status: 400 }
    );
  }

  // If the password matches, treat the user as an admin and set the cookie
  const response = NextResponse.json({
    message: "Login successful",
    user: data,
  });

  response.cookies.set('isAdmin', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',  // Set for the whole domain
  });
  
  
  return response;
  
}

// Password Reset Request
export async function PUT(req: NextRequest) {
  const { email } = await req.json();

  // Generate a reset token (e.g., UUID)
  const resetToken = uuidv4();

  // Set expiration date for 24 hours from now (optional)
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);

  try {
    // Store the reset token and expiration date in the users table
    const { error } = await supabase
      .from('users')
      .update({ reset_token: resetToken, reset_token_expiration: expirationDate })
      .eq('email', email);

    if (error) {
   return NextResponse.json(
        { message: "Failed to update reset token." },
        { status: 400 }
      );
    }

    // Send the reset email
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`;
    await sendResetEmail(email, resetLink);

  } catch {
    return NextResponse.json(
      { message: "Error during password reset request." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Password reset email sent. Check your inbox."
  });
}


// Update Password after reset (PATCH method)
export async function PATCH(req: NextRequest) {
  const { email, password } = await req.json();

  // Validate that all fields are provided
  if (!email) {
    return NextResponse.json(
      { message: "Email are required." },
      { status: 400 }
    );
  }
  // Validate that all fields are provided
  if (!password ) {
    return NextResponse.json(
      { message: "new password is required." },
      { status: 400 }
    );
  }
  const resetToken =  uuidv4();


  // Validate that all fields are provided
  if (!resetToken) {
    return NextResponse.json(
      { message: "reset token are required." },
      { status: 400 }
    );
  }

  // Fetch user by email and check the reset token
  const { data, error } = await supabase
    .from("users")
    .select("id, email, reset_token, reset_token_expiration")
    .eq("email", email)
    .single();  // Ensures only one result is returned

  // If no data is returned or there is an error, respond with a helpful message
  if (error || !data) {
    return NextResponse.json(
      { message: "User not found or invalid token." },
      { status: 400 }
    );
  }

  



  // Step 3: Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 4: Update the password and clear the reset token
  const { error: updateError } = await supabase
    .from("users")
    .update({
      password: hashedPassword,      // Update password
      reset_token: null,              // Clear reset token
      reset_token_expiration: null   // Clear token expiration date
    })
    .eq("email", email);  // Update the user with the provided email

  // If an error occurs during the update
  if (updateError) {
    return NextResponse.json(
      { message: "Failed to update password." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Password updated successfully.",
  });
}

