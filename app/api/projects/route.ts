import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("/api/projects GET error", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const created = await Project.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("/api/projects POST error", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
