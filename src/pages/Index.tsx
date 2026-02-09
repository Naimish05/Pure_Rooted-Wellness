import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES, SAMPLE_ARTICLES } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";

export default function Index() {
  const featured = SAMPLE_ARTICLES[0];
  const recent = SAMPLE_ARTICLES.slice(1, 7);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
              Wellness, <span className="text-primary">Rooted</span> in Science
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Nourish your body, calm your mind, and build habits that last. Evidence-based guidance for a healthier, more intentional life.
            </p>
            <Link
              to={`/article/${featured.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              Read Featured Article <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
            Explore Topics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <span className="text-4xl">{cat.icon}</span>
                  <h3 className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
            Recent Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary/10 p-8 text-center md:p-12">
            <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Start Your Wellness Journey
            </h2>
            <p className="mb-6 text-muted-foreground">
              Explore our articles on nutrition, yoga, routines, and mental wellness — all grounded in science and practical wisdom.
            </p>
            <Link
              to="/category/nutrition"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              Explore Nutrition <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
