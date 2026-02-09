import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getArticleBySlug, getArticlesByCategory, getCategoryBySlug, type CategorySlug } from "@/lib/constants";
import ShareButtons from "@/components/ShareButtons";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) return <Navigate to="/404" replace />;

  const cat = getCategoryBySlug(article.category);
  const related = getArticlesByCategory(article.category as CategorySlug)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const url = typeof window !== "undefined" ? window.location.href : "";

  // Simple markdown-ish rendering: split by \n\n, handle ## headings and **bold**
  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mb-3 mt-8 text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {block.replace("## ", "")}
          </h2>
        );
      }
      // Handle list items
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
      return (
        <p key={i} className="mb-4 leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{
          __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")
        }} />
      );
    });
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
                {article.readingTime} min read
              </div>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </motion.div>

          <div className="mb-8 overflow-hidden rounded-xl">
            <img src={article.coverImage} alt={article.title} className="w-full object-cover" />
          </div>

          <div className="prose-custom mb-8">
            {renderContent(article.content)}
          </div>

          <div className="border-t border-border pt-6">
            <ShareButtons title={article.title} url={url} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
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
      )}
    </>
  );
}
