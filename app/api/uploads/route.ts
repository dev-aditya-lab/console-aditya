import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUDE_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = "blog";

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.warn("Cloudinary env vars missing. Check CLOUDINARY_CLOUDE_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.");
}

function sign(params: Record<string, string | number>) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const toSign = `${sorted}${API_SECRET}`;
  return crypto.createHash("sha1").update(toSign).digest("hex");
}

export async function GET() {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
  }
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=${FOLDER}/&max_results=50&direction=desc`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Failed to list images", details: text }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json({ resources: data.resources ?? [] });
}

export async function POST(req: NextRequest) {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = sign({ folder: FOLDER, timestamp });

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("api_key", API_KEY);
  uploadForm.append("timestamp", String(timestamp));
  uploadForm.append("signature", signature);
  uploadForm.append("folder", FOLDER);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
    method: "POST",
    body: uploadForm,
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Upload failed", details: text }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json({
    url: data.secure_url,
    public_id: data.public_id,
    bytes: data.bytes,
    format: data.format,
    width: data.width,
    height: data.height,
  });
}
