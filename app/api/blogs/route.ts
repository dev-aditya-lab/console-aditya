import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// GET all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json(blogs);
  } catch (error) {
    console.error("/api/blogs GET error", error);
    return Response.json({ error: "Database unavailable" }, { status: 500 });
  }
}

// POST new blog
export async function POST(req:Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return Response.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("/api/blogs POST error", error);
    return Response.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
