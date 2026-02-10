import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCreatePost, useUpdatePost, useAllPosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CATEGORIES } from "@/lib/constants";
import { ArrowLeft, Link as LinkIcon, Loader2, Bold, Italic, Heading2, Heading3, List, Quote, Eye, Edit } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
  const [published, setPublished] = useState(true);
  const [loaded, setLoaded] = useState(false);
  
  // Preview State
  const [isPreview, setIsPreview] = useState(false);

  const { data: allPosts } = useAllPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  // Load existing post
  useEffect(() => {
    if (isNew || loaded || !allPosts) return;
    
    const post = allPosts.find(p => p.id === id);
    if (!post) { 
      if (!isNew) navigate("/admin"); 
      return; 
    }

    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCategory(post.category);
    setCoverImage(post.cover_image || "");
    setPublished(post.published);
    setLoaded(true);
  }, [id, isNew, loaded, navigate, allPosts]);

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

    // Validate size (e.g., 2MB limit)
    if (file.size > 2 * 1024 * 1024) { 
      toast.error("Image must be under 2MB");
      return;
    }

    // Upload to Supabase Storage
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setCoverImage(data.publicUrl);
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error("Error uploading image: " + error.message);
    }
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);

    // Auto-detect title from # Heading
    if (val.trimStart().startsWith("# ")) {
      const firstLine = val.split("\n")[0];
      const potentialTitle = firstLine.replace(/^#\s+/, "").trim(); 
      
      if (potentialTitle) {
        if (!title || title.trim() === "") {
          setTitle(potentialTitle);
          if (isNew && (!slug || slug.trim() === "")) {
            setSlug(generateSlug(potentialTitle));
          }
        } 
        else if (potentialTitle.startsWith(title) || title.startsWith(potentialTitle)) {
           setTitle(potentialTitle);
           if (isNew && slug === generateSlug(title)) {
             setSlug(generateSlug(potentialTitle));
           }
        }
      }
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const scrollTop = textarea.scrollTop;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newContent = before + prefix + selection + suffix + after;
    setContent(newContent);
    
    setTimeout(() => {
        textarea.focus({ preventScroll: true });
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        textarea.scrollTop = scrollTop;
    }, 0);
  };

  const renderPreview = (text: string) => {
    if (!text) return <p className="text-muted-foreground italic">Nothing to preview yet.</p>;

    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="mb-2 mt-4 text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mb-3 mt-6 text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.match(/^(\d+\.\s|\-\s)/m)) {
        const items = block.split("\n").filter(Boolean);
        const isOrdered = items[0]?.match(/^\d+\./);
        const Tag = isOrdered ? "ol" : "ul";
        return (
          <Tag key={i} className={`mb-4 space-y-1 pl-6 ${isOrdered ? "list-decimal" : "list-disc"}`}>
            {items.map((item, j) => (
              <li key={j} className="text-foreground/90" dangerouslySetInnerHTML={{
                __html: item.replace(/^(\d+\.\s|\-\s)/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              }} />
            ))}
          </Tag>
        );
      }
       if (block.startsWith("> ")) {
        return (
          <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
            {block.replace(/^> /, "")}
          </blockquote>
        );
      }
      return (
        <p key={i} className="mb-4 leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{
          __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")
        }} />
      );
    });
  };

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
          <div className="ml-auto flex gap-2">
             <Button 
                variant={isPreview ? "default" : "outline"} 
                size="sm" 
                onClick={() => setIsPreview(!isPreview)}
                className="gap-2"
             >
                {isPreview ? <><Edit className="h-4 w-4" /> Edit</> : <><Eye className="h-4 w-4" /> Preview</>}
             </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-6">
          
          <div className={isPreview ? "hidden" : "block"}>
             <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Article title" />
             </div>
             
             <div className="mt-4">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" />
             </div>
             
             <div className="mt-4">
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
             
             <div className="mt-4 mb-6">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description…" rows={2} />
             </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label htmlFor="content">Content (Markdown)</Label>
              {!isPreview && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertMarkdown("**", "**")} title="Bold">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertMarkdown("*", "*")} title="Italic">
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="mx-1 h-4 w-px bg-border" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertMarkdown("## ")} title="Heading 2">
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertMarkdown("### ")} title="Heading 3">
                  <Heading3 className="h-4 w-4" />
                </Button>
                <div className="mx-1 h-4 w-px bg-border" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertMarkdown("- ")} title="List">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertMarkdown("> ")} title="Quote">
                  <Quote className="h-4 w-4" />
                </Button>
              </div>
              )}
            </div>
            
            {isPreview ? (
              <div className="min-h-[400px] rounded-md border border-border bg-card p-6 prose-custom shadow-sm">
                 <h1 className="mb-4 text-3xl font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    {title || "Untitled Post"}
                 </h1>
                 {renderPreview(content)}
              </div>
            ) : (
              <Textarea 
                id="content" 
                value={content} 
                onChange={handleContentChange} 
                placeholder="Write your article… (Start with '# Title' to auto-fill title)" 
                rows={16} 
                className="font-mono text-sm leading-relaxed" 
              />
            )}
          </div>

          {!isPreview && (
          <div>
            <Label>Cover Image</Label>
             <div className="mt-2 space-y-4">
              <div className="flex items-center gap-4">
                 <Button variant="outline" className="relative cursor-pointer" type="button">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 cursor-pointer opacity-0" 
                      onChange={handleImageUpload} 
                    />
                    <Loader2 className="mr-2 h-4 w-4" /> Upload from Computer
                 </Button>
                 <span className="text-xs text-muted-foreground">Max 800KB</span>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or using URL</span>
                </div>
              </div>

              <div className="relative">
                <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="coverImage" 
                  value={coverImage} 
                  onChange={(e) => setCoverImage(e.target.value)} 
                  placeholder="https://..." 
                  className="pl-9"
                />
              </div>

              {coverImage && (
                <div className="mt-4 overflow-hidden rounded-md border border-border">
                  <img 
                    src={coverImage} 
                    alt="Preview" 
                    className="h-64 w-full object-cover" 
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
              )}
            </div>
          </div>
          )}

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
