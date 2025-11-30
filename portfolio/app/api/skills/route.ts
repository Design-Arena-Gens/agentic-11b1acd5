import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Get skills error:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    const data = await req.json();
    const skill = await Skill.create(data);

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error: any) {
    console.error("Create skill error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create skill" },
      { status: error.message === "Unauthorized" || error.message === "Admin access required" ? 401 : 500 }
    );
  }
}
