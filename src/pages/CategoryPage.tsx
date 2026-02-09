import { useParams, Navigate } from "react-router-dom";
import { getCategoryBySlug, getArticlesByCategory, type CategorySlug } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");

  if (!category) return <Navigate to="/404" replace />;

  const articles = getArticlesByCategory(category.slug as CategorySlug);

  return (
    <>
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-4 inline-block text-5xl">{category.icon}</span>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              {category.title}
            </h1>
            <p className="mx-auto max-w-xl text-muted-foreground">{category.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
