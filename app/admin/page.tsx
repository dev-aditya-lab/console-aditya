"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MarkdownRenderer } from "@/components/ui/markdown";

type CloudImage = {
  public_id: string;
  secure_url: string;
  bytes?: number;
  format?: string;
  width?: number;
  height?: number;
};

type BlogItem = {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
};

function formatDate(input?: string): string {
  if (!input) return "";
  try {
    return new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return input;
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<BlogItem | null>(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<CloudImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [projects, setProjects] = useState<{
    _id?: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    order?: number;
    createdAt?: string;
  }[]>([]);
  const [editingProject, setEditingProject] = useState<{
    _id?: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    order?: number;
  } | null>(null);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return blogs.filter(
      (b) => b.title.toLowerCase().includes(q) || b.content.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const reload = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/blogs", { cache: "no-store" });
      if (!res.ok) {
        setErrorMsg("Failed to load blogs (DB unavailable)");
        setBlogs([]);
        return;
      }
      const data = (await res.json().catch(() => null)) as BlogItem[] | null;
      setBlogs(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadImages = useCallback(async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/uploads", { cache: "no-store" });
      const data = await res.json();
      setImages(data.resources ?? []);
    } finally {
      setGalleryLoading(false);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    const res = await fetch("/api/projects", { cache: "no-store" });
    if (!res.ok) {
      setErrorMsg("Failed to load projects (DB unavailable)");
      setProjects([]);
      return;
    }
    const data = await res.json().catch(() => null);
    setProjects((data as typeof projects) ?? []);
  }, []);

  useEffect(() => {
    reload();
    loadImages();
    loadProjects();
  }, [reload, loadImages, loadProjects]);

  async function handleDelete(id?: string) {
    if (!id) return;
    const ok = confirm("Delete this post?");
    if (!ok) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    await reload();
  }

  async function handleSave(data: BlogItem) {
    if (data._id) {
      await fetch(`/api/blogs/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditing(null);
    await reload();
  }

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      await loadImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function saveProject(p: {
    _id?: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    order?: number;
  }) {
    const payload = { ...p, tags: p.tags.map((t) => t.trim()).filter(Boolean) };
    if (p._id) {
      await fetch(`/api/projects/${p._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setEditingProject(null);
    await loadProjects();
  }

  async function deleteProject(id?: string) {
    if (!id) return;
    const ok = confirm("Delete this project?");
    if (!ok) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await loadProjects();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {errorMsg && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:border-red-800/40 dark:bg-red-900/30 dark:text-red-100">
            {errorMsg}
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your blog posts</p>
          </div>
          <button
            onClick={() => setEditing({ title: "", content: "" })}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            + New Post
          </button>
        </div>

        <div className="flex items-center justify-end mb-4">
          <button onClick={logout} className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm">
            Logout
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title or content"
            className="w-full md:w-96 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white">Title</th>
                  <th className="px-6 py-4 text-left text-white">Created</th>
                  <th className="px-6 py-4 text-left text-white">Excerpt</th>
                  <th className="px-6 py-4 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-600 dark:text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-600 dark:text-gray-400">
                      No posts found
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr
                      key={b._id}
                      className="bg-white dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-700/50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                        {b.title}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {formatDate(b.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {(b.content || "").slice(0, 120)}{(b.content || "").length > 120 ? "…" : ""}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setEditing(b)}
                            className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm shadow hover:shadow-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(b._id)}
                            className="px-3 py-1.5 rounded-full bg-red-600 text-white text-sm shadow hover:shadow-md"
                          >
                            Delete
                          </button>
                          <a
                            href={`/blog/${b._id}`}
                            className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm shadow hover:shadow-md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Media / Images Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Images</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Upload images to Cloudinary and reuse them in posts.</p>
            </div>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg cursor-pointer">
              {uploading ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                }}
              />
            </label>
          </div>

          {galleryLoading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading images...</p>
          ) : images.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.public_id}
                  className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.secure_url}
                    alt={img.public_id}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {img.public_id}
                      </p>
                      {img.bytes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {(img.bytes / 1024).toFixed(1)} KB
                        </p>
                      )}
                    </div>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(img.secure_url);
                        alert("Link copied");
                      }}
                      className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-xs font-medium shadow hover:shadow-md"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Projects</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Create and manage portfolio projects.</p>
            </div>
            <button
              onClick={() => setEditingProject({ title: "", description: "", imageUrl: "", tags: [] })}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg"
            >
              + New Project
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white">Title</th>
                  <th className="px-6 py-4 text-left text-white">Order</th>
                  <th className="px-6 py-4 text-left text-white">Tags</th>
                  <th className="px-6 py-4 text-left text-white">Image</th>
                  <th className="px-6 py-4 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-600 dark:text-gray-400">No projects yet</td>
                  </tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p._id} className="bg-white dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-700/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{p.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveProject({ ...p, order: (p.order ?? 0) - 1 })}
                            className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-xs"
                          >
                            ▲
                          </button>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{p.order ?? 0}</span>
                          <button
                            onClick={() => saveProject({ ...p, order: (p.order ?? 0) + 1 })}
                            className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-xs"
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {p.tags?.join(", ")}
                      </td>
                      <td className="px-6 py-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-24 h-16 object-cover rounded" />}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setEditingProject(p)} className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm">Edit</button>
                          <button onClick={() => deleteProject(p._id)} className="px-3 py-1.5 rounded-full bg-red-600 text-white text-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Editor Modal */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setEditingProject(null)} />
            <div className="relative z-10 w-full md:max-w-3xl md:rounded-2xl md:shadow-2xl bg-white dark:bg-gray-800 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{editingProject._id ? "Edit Project" : "New Project"}</h2>
                <button onClick={() => setEditingProject(null)} className="px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700">Close</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Project title"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  type="number"
                  value={editingProject.order ?? 0}
                  onChange={(e) => setEditingProject({ ...editingProject, order: Number(e.target.value) })}
                  placeholder="Order (lower shows first)"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  value={editingProject.githubUrl || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  placeholder="GitHub URL"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  value={editingProject.liveUrl || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="Live URL"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  value={editingProject.imageUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  placeholder="Image URL (paste from Images section)"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setImagePickerOpen(true)}
                  className="px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  Pick from Images
                </button>
              </div>

              <textarea
                rows={6}
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Short description"
                className="mt-4 w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />

              <input
                value={(editingProject.tags || []).join(", ")}
                onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(",") })}
                placeholder="Tags (comma separated)"
                className="mt-4 w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />

              <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700">Cancel</button>
                <button
                  onClick={() =>
                    saveProject({
                      _id: editingProject._id,
                      title: editingProject.title.trim(),
                      description: editingProject.description.trim(),
                      imageUrl: editingProject.imageUrl.trim(),
                      tags: (editingProject.tags || []).map((t) => t.trim()),
                      githubUrl: editingProject.githubUrl?.trim(),
                      liveUrl: editingProject.liveUrl?.trim(),
                    })
                  }
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
                >
                  {editingProject._id ? "Save" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Picker Modal */}
        {imagePickerOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setImagePickerOpen(false)} />
            <div className="relative z-10 w-full md:max-w-4xl md:rounded-2xl md:shadow-2xl bg-white dark:bg-gray-800 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Select Image</h2>
                <button onClick={() => setImagePickerOpen(false)} className="px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700">Close</button>
              </div>
              {galleryLoading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              ) : images.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No images available. Upload first.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <button
                      key={img.public_id}
                      onClick={() => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, imageUrl: img.secure_url });
                        }
                        setImagePickerOpen(false);
                      }}
                      className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.secure_url} alt={img.public_id} className="w-full h-40 object-cover" />
                      <div className="p-3 text-left">
                        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{img.public_id}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Editor Drawer/Modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setEditing(null)}
            />
            <div className="relative z-10 w-full md:max-w-3xl md:rounded-2xl md:shadow-2xl bg-white dark:bg-gray-800 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {editing._id ? "Edit Post" : "New Post"}
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  className="px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  Close
                </button>
              </div>

              {/* Title */}
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Post title"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-3"
              />

              {/* Markdown Toolbar */}
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { label: "H1", insert: "# " },
                  { label: "H2", insert: "## " },
                  { label: "Bold", insert: "**bold**" },
                  { label: "Italic", insert: "*italic*" },
                  { label: "Code", insert: "`code`" },
                  { label: "List", insert: "- item" },
                  { label: "Quote", insert: "> quote" },
                  { label: "Link", insert: "[text](https://)" },
                  { label: "Image", insert: "![alt](https://)" },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() =>
                      setEditing({
                        ...editing,
                        content: `${editing.content}\n${b.insert}`,
                      })
                    }
                    type="button"
                    className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm"
                  >
                    {b.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="ml-auto px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm"
                >
                  {preview ? "Edit" : "Preview"}
                </button>
              </div>

              {/* Editor / Preview */}
              {!preview ? (
                <textarea
                  rows={12}
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  placeholder="Write markdown..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <MarkdownRenderer content={editing.content} />
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave({
                    _id: editing._id,
                    title: editing.title.trim(),
                    content: editing.content.trim(),
                  })}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  {editing._id ? "Save Changes" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
