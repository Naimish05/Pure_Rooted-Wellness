

# 🌿 Wellness Blog — Implementation Plan

## Overview
A warm, earthy wellness blog with four content categories, a BMI calculator, dark mode, social sharing, and an admin panel for managing posts — powered by Supabase for the backend.

---

## 1. Design & Branding
- **Color palette**: Warm earthy tones — sage greens, warm beiges, terracotta accents, soft cream backgrounds
- **Typography**: Clean serif headings paired with readable sans-serif body text
- **Dark mode**: Deep forest greens and warm grays instead of harsh blacks
- **Overall feel**: Calm, inviting, nature-inspired

## 2. Pages & Layout

### Homepage
- Hero section with blog tagline and featured article
- Category cards for the four topics (Nutrition, Yoga, Routines, Mental Wellness)
- Recent articles grid
- Newsletter-style call to action

### Category Pages
- One page per topic showing all articles in that category
- Category banner with description and icon

### Article Page
- Full article view with cover image, reading time, and publish date
- Social sharing buttons (Twitter/X, Facebook, WhatsApp, copy link)
- Related articles at the bottom

### BMI Calculator Page
- Clean, interactive calculator with height/weight inputs (metric & imperial)
- Visual result display with BMI category explanation and a color-coded scale

### About Page
- Brief bio/mission statement for the blog

## 3. Navigation
- Sticky top navigation bar with logo, category links, dark mode toggle, and BMI Calculator link
- Mobile-responsive hamburger menu
- Footer with quick links and social icons

## 4. Backend (Supabase via Lovable Cloud)
- **Posts table**: title, slug, content, category, cover image, excerpt, published status, created/updated dates
- **Categories**: Healthy Diets & Nutrition, Yoga & Mindful Movement, Routines & Habit Building, Mental & Holistic Wellness
- **Authentication**: Email/password login for admin access
- **Storage**: For uploading article cover images

## 5. Admin Panel (Protected)
- Login page for the admin
- Dashboard showing all posts with status (draft/published)
- Create/edit post form with rich text content, category selector, cover image upload, and excerpt
- Delete posts with confirmation
- Only accessible to authenticated admin users

## 6. Starter Content
- Pre-populated with a few sample articles across each category matching the topics you listed (e.g., "Gut Health 101," "Yoga for Desk Workers," "The Low-Dopamine Morning," "Digital Detox Strategies")

## 7. Features
- **Dark mode toggle** with smooth transitions
- **Social sharing** on each article (Twitter/X, Facebook, WhatsApp, copy link)
- **Responsive design** optimized for mobile, tablet, and desktop
- **SEO-friendly** article slugs and meta structure

