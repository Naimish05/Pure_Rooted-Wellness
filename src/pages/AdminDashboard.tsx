import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllPosts, useDeletePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";
import { Leaf, Plus, Edit, Trash2, LogOut, Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: posts, isLoading } = useAllPosts();
  const deletePost = useDeletePost();
  const navigate = useNavigate();

  if (authLoading) return <div className="flex min-h-screen items-center justify-center">Loading…</div>;
  if (!user) { navigate("/admin/login"); return null; }
  if (!isAdmin) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-muted-foreground">You don't have admin permissions. Contact the site owner to get access.</p>
      <Button variant="outline" onClick={() => signOut().then(() => navigate("/admin/login"))}>Sign Out</Button>
    </div>
  );

  const getCat = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            <Leaf className="h-6 w-6 text-primary" /> Pure Rooted
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={() => signOut().then(() => navigate("/admin/login"))}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Posts</h1>
          <Button onClick={() => navigate("/admin/post/new")} className="gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading posts…</p>
        ) : !posts?.length ? (
          <p className="text-muted-foreground">No posts yet. Create your first one!</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => {
                  const cat = getCat(p.category);
                  return (
                    <tr key={p.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{p.title}</td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="text-xs">{cat?.icon} {cat?.title || p.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        {p.published ? (
                          <span className="inline-flex items-center gap-1 text-xs text-primary"><Eye className="h-3 w-3" /> Published</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><EyeOff className="h-3 w-3" /> Draft</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/post/${p.id}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete "{p.title}"?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletePost.mutate(p.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
