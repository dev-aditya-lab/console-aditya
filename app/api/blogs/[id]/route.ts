import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { NextRequest } from "next/server";

// GET single blog by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return Response.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return Response.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// DELETE blog by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const deletedBlog = await Blog.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return Response.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return Response.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

// PUT/PATCH - Update blog by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return Response.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return Response.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
