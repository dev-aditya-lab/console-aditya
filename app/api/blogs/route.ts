import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// GET all blogs
export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return Response.json(blogs);
}

// POST new blog
export async function POST(req:Request) {
  await connectDB();
  const body = await req.json();
  const newBlog = await Blog.create(body);
  return Response.json(newBlog);
}
