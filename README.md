# 🌿 Pure Rooted - Modern Wellness Blog

A clean, minimalist blog platform built for sharing content on nutrition, yoga, routines, and mental wellness. Features a powerful markdown editor, real-time database, and secure authentication.

## ✨ Features

- **Modern Tech Stack**: Built with React, Vite, TypeScript, and Tailwind CSS.
- **Supabase Integration**:
  - **Database**: PostgreSQL for storing blog posts.
  - **Auth**: Secure Email/Password authentication for admins.
  - **Storage**: Image hosting for blog covers.
- **Admin Dashboard**:
  - Create, Edit, and Delete posts.
  - **Markdown Editor**: Write in markdown with a live preview mode.
  - **Image Upload**: Drag & drop or file selection for cover images.
  - **Draft Mode**: Save posts as drafts before publishing.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Dark Mode**: Seamless toggle between light and dark themes.
- **SEO Ready**: Dynamic slugs and meta tags (ready for implementation).

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Lucide React (Icons)
- **State Management**: React Query (TanStack Query)
- **Backend & Auth**: Supabase
- **Routing**: React Router DOM
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Supabase account

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/pure-rooted.git
    cd pure-rooted
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the Database Setup:**
    Execute the following SQL in your Supabase SQL Editor to create the necessary tables and policies:

    ```sql
    -- Create Posts Table
    create table public.posts (
      id uuid default gen_random_uuid() primary key,
      title text not null,
      slug text not null unique,
      content text,
      excerpt text,
      category text,
      cover_image text,
      published boolean default false,
      author_id uuid references auth.users(id),
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Enable RLS
    alter table public.posts enable row level security;

    -- Create Policies
    create policy "Public posts are viewable by everyone" on public.posts
      for select using (published = true);

    create policy "Admins can insert posts" on public.posts
      for insert with check (auth.role() = 'authenticated');

    create policy "Admins can update posts" on public.posts
      for update using (auth.role() = 'authenticated');

    create policy "Admins can delete posts" on public.posts
      for delete using (auth.role() = 'authenticated');

    -- Storage Bucket
    insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);

    create policy "Images are publicly accessible" on storage.objects
      for select using (bucket_id = 'blog-images');

    create policy "Admins can upload images" on storage.objects
      for insert with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');
    ```

5.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

## 🔐 Admin Access

1.  Navigate to `/admin/login`.
2.  Sign up for a new account (first user).
3.  **Important:** Go to your Supabase Dashboard -> Authentication -> Providers and **disable "Enable Email Signup"** to prevent unauthorized users from registering.
4.  Use `/admin` to manage your content.

## 📦 Deployment

This project is ready for deployment on **Vercel**, **Netlify**, or **InfinityFree**.

**Build Command:**

```bash
npm run build
```

The output will be in the `dist` folder.

---

**Built with 💚 by [Naimish Patel]**
