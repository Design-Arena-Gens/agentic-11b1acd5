import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await params;
    const data = await req.json();

    const experience = await Experience.findByIdAndUpdate(id, data, { new: true });

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json({ experience });
  } catch (error: any) {
    console.error("Update experience error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update experience" },
      { status: error.message === "Unauthorized" || error.message === "Admin access required" ? 401 : 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await params;
    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    console.error("Delete experience error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete experience" },
      { status: error.message === "Unauthorized" || error.message === "Admin access required" ? 401 : 500 }
    );
  }
}
