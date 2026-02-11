import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { getCategoryBySlug } from "@/lib/constants";
import { usePostBySlug, usePostsByCategory } from "@/hooks/usePosts";
import ShareButtons from "@/components/ShareButtons";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = usePostBySlug(slug || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!article?.id) return;

    const channel = supabase
      .channel(`article-${article.id}`)
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts", filter: `id=eq.${article.id}` },
        () => {
          toast.info("This post has been removed.");
          navigate("/");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [article?.id, navigate]);

  if (isLoading) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Loading…</div>;
  if (!article) return <Navigate to="/404" replace />;

  const cat = getCategoryBySlug(article.category);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const readingTime = Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));

  const renderContent = (text: string) => {
    if (!text) return null;

    const lines = text.split("\n");
    const blocks: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let currentList: string[] = [];
    let isOrderedList = false;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        blocks.push(
          <p key={`p-${blocks.length}`} className="mb-4 leading-relaxed text-foreground/90 whitespace-pre-wrap" dangerouslySetInnerHTML={{
             __html: currentParagraph.join("\n")
               .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
               .replace(/\*(.*?)\*/g, "<em>$1</em>")
               .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full" />')
          }} />
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        const Tag = isOrderedList ? "ol" : "ul";
        blocks.push(
          <Tag key={`l-${blocks.length}`} className={`mb-4 space-y-1 pl-6 ${isOrderedList ? "list-decimal" : "list-disc"}`}>
            {currentList.map((item, j) => (
              <li key={j} className="text-foreground/90" dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")
              }} />
            ))}
          </Tag>
        );
        currentList = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      
      // Headers (Allowing no space after #)
      const h3Match = line.match(/^###\s?(.*)/);
      if (h3Match) {
        flushParagraph();
        flushList();
        blocks.push(
          <h3 key={`h3-${i}`} className="mb-2 mt-6 text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {h3Match[1]}
          </h3>
        );
        return;
      }

      const h2Match = line.match(/^##\s?(.*)/);
      if (h2Match) {
        flushParagraph();
        flushList();
        blocks.push(
          <h2 key={`h2-${i}`} className="mb-3 mt-8 text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {h2Match[1]}
          </h2>
        );
        return;
      }

      // Blockquotes (Relaxed: allow >Text defined)
      const quoteMatch = line.match(/^>\s?(.*)/);
      if (quoteMatch) {
        flushParagraph();
        flushList();
        blocks.push(
          <blockquote key={`bq-${i}`} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
            {quoteMatch[1]}
          </blockquote>
        );
        return;
      }

      // Lists (Relaxed: allow -Item or 1.Item)
      const listMatch = line.match(/^(\d+\.|-|\*)\s?(.*)/);
      if (listMatch) {
        flushParagraph();
        // Check if we are switching list types or starting a new one
        const newIsOrdered = /^\d+\./.test(listMatch[1]);
        if (currentList.length > 0 && newIsOrdered !== isOrderedList) {
             flushList(); // Flush previous list if type changed
        }
        
        isOrderedList = newIsOrdered;
        currentList.push(listMatch[2]);
        return;
      }

      // If it's an empty line, flush everything (paragraph break)
      if (trimmed === "") {
        flushParagraph();
        flushList();
        return;
      }

      // Otherwise, it's a paragraph line
      flushList(); // If we were in a list, close it
      currentParagraph.push(line);
    });

    // Final flush
    flushParagraph();
    flushList();

    return blocks;
  };

  return (
    <>
      <article className="py-8">
        <div className="container mx-auto max-w-3xl px-4">
          <Link to={cat ? `/category/${cat.slug}` : "/"} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to {cat?.title || "Home"}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {cat && (
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
                {cat.icon} {cat.title}
              </span>
            )}
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              {article.title}
            </h1>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </div>
              <span>
                {new Date(article.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </motion.div>

          {article.cover_image && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img src={article.cover_image} alt={article.title} className="w-full object-cover" />
            </div>
          )}

          <div className="prose-custom mb-8">
            {renderContent(article.content)}
          </div>

          <div className="border-t border-border pt-6">
            <ShareButtons title={article.title} url={url} />
          </div>
        </div>
      </article>

      <RelatedArticles category={article.category} currentId={article.id} />
    </>
  );
}

function RelatedArticles({ category, currentId }: { category: string; currentId: string }) {
  const { data: posts } = usePostsByCategory(category);
  const related = posts?.filter((a) => a.id !== currentId).slice(0, 3) ?? [];

  if (related.length === 0) return null;

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Related Articles
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
