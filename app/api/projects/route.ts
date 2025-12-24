import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const created = await Project.create(body);
  return NextResponse.json(created, { status: 201 });
}
