import { motion } from "framer-motion";
import { Leaf, Heart, BookOpen, Users } from "lucide-react";

export default function About() {
  const values = [
    { icon: BookOpen, title: "Evidence-Based", desc: "Every article is grounded in research, not trends." },
    { icon: Heart, title: "Holistic Approach", desc: "We believe wellness encompasses body, mind, and spirit." },
    { icon: Users, title: "Accessible", desc: "No gatekeeping — wellness is for everyone, everywhere." },
    { icon: Leaf, title: "Sustainable", desc: "Small, consistent changes over drastic overhauls." },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <img src="/Logo.png" alt="Rooted Logo" className="mx-auto mb-4 h-12 w-12 object-contain" />
          <h1 className="mb-4 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            About Rooted
          </h1>
          <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground">
            Rooted is a wellness blog dedicated to helping you build a healthier, more intentional life — one evidence-based article at a time.
          </p>
        </motion.div>

        <div className="mb-12 space-y-4 text-foreground/90 leading-relaxed">
          <p>
            We started Rooted because we were tired of wellness content that was either too vague, too extreme, or too commercialized. We believe that real wellness isn't about perfection — it's about understanding your body and mind, and making small changes that stick.
          </p>
          <p>
            Our content spans four pillars: <strong>Nutrition</strong> that explains the science behind the food, <strong>Yoga & Movement</strong> that's accessible to everyone, <strong>Routines</strong> that turn information into lasting habits, and <strong>Mental Wellness</strong> that addresses the inner work most people skip.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <v.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
