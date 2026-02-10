import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  cover_image: string | null;
  published: boolean;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export function usePublishedPosts() {
  return useQuery({
    queryKey: ["posts", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
}

export function usePostsByCategory(category: string) {
  return useQuery({
    queryKey: ["posts", "category", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", category)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ["posts", "slug", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) return null; // Handle not found gracefully
      return data as Post;
    },
  });
}

export function useAllPosts() {
  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (newPost: Omit<Post, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("posts")
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created via Supabase!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Post> & { id: string }) => {
      const { data, error } = await supabase
        .from("posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated via Supabase!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
