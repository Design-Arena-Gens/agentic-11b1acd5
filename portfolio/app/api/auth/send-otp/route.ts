import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OTP from "@/models/OTP";
import User from "@/models/User";
import { generateOTP, sendOTPEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user exists and get admin status
    let user = await User.findOne({ email: email.toLowerCase() });
    const isAdmin = user?.isAdmin || email === process.env.ADMIN_EMAIL;

    // Create user if doesn't exist
    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        isAdmin,
      });
    }

    // Delete old OTPs for this email
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await OTP.create({
      email: email.toLowerCase(),
      otp,
      expiresAt,
    });

    // Send OTP email
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // For development, return OTP in response (remove in production)
      return NextResponse.json({
        success: true,
        message: "OTP generated (email failed)",
        devOtp: process.env.NODE_ENV === "development" ? otp : undefined,
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
