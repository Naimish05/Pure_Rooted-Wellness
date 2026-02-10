export const CATEGORIES = [
  {
    slug: "nutrition",
    title: "Healthy Diets & Nutrition",
    description:
      "Don't just share recipes; understand the why behind the food.",
    icon: "🥗",
  },
  {
    slug: "yoga",
    title: "Yoga & Mindful Movement",
    description: "Accessible practices so beginners never feel intimidated.",
    icon: "🧘",
  },
  {
    slug: "routines",
    title: "Routines & Habit Building",
    description: "Turn information into action with sustainable daily habits.",
    icon: "⏰",
  },
  {
    slug: "mental-wellness",
    title: "Mental & Holistic Wellness",
    description: "Health isn't just physical — address the inner work.",
    icon: "🧠",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: CategorySlug;
  coverImage: string;
  readingTime: number;
  published: boolean;
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
