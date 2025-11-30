import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find().sort({ startDate: -1 });
    return NextResponse.json({ experiences });
  } catch (error) {
    console.error("Get experiences error:", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await req.json();
    const experience = await Experience.create(data);

    return NextResponse.json({ experience }, { status: 201 });
  } catch (error: any) {
    console.error("Create experience error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create experience" },
      { status: error.message === "Unauthorized" || error.message === "Admin access required" ? 401 : 500 }
    );
  }
}
