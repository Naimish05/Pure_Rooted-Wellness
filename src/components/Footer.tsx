import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              <Leaf className="h-5 w-5 text-primary" />
              Rooted
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Grounded wellness for modern living. Nourish body, mind, and soul.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="text-sm transition-colors hover:text-primary">
                    {c.icon} {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pages</h4>
            <ul className="space-y-2">
              <li><Link to="/bmi" className="text-sm transition-colors hover:text-primary">BMI Calculator</Link></li>
              <li><Link to="/about" className="text-sm transition-colors hover:text-primary">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Stay Connected</h4>
            <p className="text-sm text-muted-foreground">Follow us for daily wellness tips and inspiration.</p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rooted. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
