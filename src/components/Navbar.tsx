import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  dark: boolean;
  toggle: () => void;
}

export default function Navbar({ dark, toggle }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home" },
    ...CATEGORIES.map((c) => ({ to: `/category/${c.slug}`, label: c.title.split("&")[0].trim() })),
    { to: "/bmi", label: "BMI Calculator" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          <Leaf className="h-6 w-6 text-primary" />
          <span>Rooted</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  pathname === l.to && "bg-muted text-primary"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 transition-colors hover:bg-muted lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === l.to && "bg-muted text-primary"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
