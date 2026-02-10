import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { getCategoryBySlug } from "@/lib/constants";
import type { Post } from "@/hooks/usePosts";

export default function ArticleCard({ article }: { article: Post }) {
  const cat = getCategoryBySlug(article.category);
  const readingTime = Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        {article.cover_image ? (
          <img
            src={article.cover_image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            {cat?.icon || "📝"}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {cat && (
          <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {cat.icon} {cat.title}
          </span>
        )}
        <h3 className="mb-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary" style={{ fontFamily: "var(--font-heading)" }}>
          {article.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{readingTime} min read</span>
          <span className="mx-1">·</span>
          <span>{new Date(article.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>
    </Link>
  );
}
