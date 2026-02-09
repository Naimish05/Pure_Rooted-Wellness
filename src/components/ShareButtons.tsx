import { Twitter, Facebook, Link as LinkIcon, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const buttons = [
    { icon: Twitter, label: "Share on X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}` },
    { icon: Facebook, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { icon: MessageCircle, label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encoded}` },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 transition-colors hover:bg-muted"
          aria-label={b.label}
        >
          <b.icon className="h-4 w-4" />
        </a>
      ))}
      <button onClick={copy} className="rounded-full p-2 transition-colors hover:bg-muted" aria-label="Copy link">
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
