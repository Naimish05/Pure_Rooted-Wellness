import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePostBySlug, useCreatePost, useUpdatePost, uploadCoverImage, type Post } from "@/hooks/usePosts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CATEGORIES } from "@/lib/constants";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("nutrition");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  // Load existing post
  useEffect(() => {
    if (isNew || loaded) return;
    (async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id!).maybeSingle();
      if (error || !data) { navigate("/admin"); return; }
      const p = data as Post;
      setTitle(p.title);
      setSlug(p.slug);
      setExcerpt(p.excerpt);
      setContent(p.content);
      setCategory(p.category);
      setCoverImage(p.cover_image || "");
      setPublished(p.published);
      setLoaded(true);
    })();
  }, [id, isNew, loaded, navigate]);

  if (authLoading) return <div className="flex min-h-screen items-center justify-center">Loading…</div>;
  if (!user || !isAdmin) { navigate("/admin/login"); return null; }

  const generateSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCoverImage(file);
      setCoverImage(url);
    } catch (err: any) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!title || !slug || !content || !excerpt) return;
    const postData = {
      title,
      slug,
      content,
      excerpt,
      category,
      cover_image: coverImage || null,
      published,
      author_id: user.id,
    };

    if (isNew) {
      await createPost.mutateAsync(postData);
    } else {
      await updatePost.mutateAsync({ id: id!, ...postData });
    }
    navigate("/admin");
  };

  const saving = createPost.isPending || updatePost.isPending;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-4 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {isNew ? "New Post" : "Edit Post"}
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Article title" />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>{c.icon} {c.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description…" rows={2} />
          </div>

          <div>
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your article…" rows={16} className="font-mono text-sm" />
          </div>

          <div>
            <Label>Cover Image</Label>
            <div className="mt-1 flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm transition-colors hover:bg-muted">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? "Uploading…" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
              {coverImage && (
                <img src={coverImage} alt="Cover preview" className="h-16 w-24 rounded-md object-cover" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving || !title || !slug || !content || !excerpt}>
              {saving ? "Saving…" : isNew ? "Create Post" : "Update Post"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin")}>Cancel</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
