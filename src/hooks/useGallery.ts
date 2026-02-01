import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type GalleryPost = Tables<"gallery_posts"> & {
  profiles?: { username: string; avatar_url: string | null } | null;
  likes_count?: number;
  is_liked?: boolean;
};

export function useGalleryPosts(sortBy: "latest" | "popular" = "latest") {
  return useQuery({
    queryKey: ["gallery-posts", sortBy],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      const { data: posts, error } = await supabase
        .from("gallery_posts")
        .select("*")
        .order(sortBy === "popular" ? "views" : "created_at", { ascending: false });

      if (error) throw error;

      // Get profiles and likes count for each post
      const postsWithDetails = await Promise.all(
        (posts || []).map(async (post) => {
          // Get profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("user_id", post.user_id)
            .maybeSingle();

          // Get likes count
          const { count: likesCount } = await supabase
            .from("gallery_likes")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);

          let isLiked = false;
          if (userId) {
            const { data: like } = await supabase
              .from("gallery_likes")
              .select("id")
              .eq("post_id", post.id)
              .eq("user_id", userId)
              .maybeSingle();
            isLiked = !!like;
          }

          return {
            ...post,
            profiles: profile,
            likes_count: likesCount || 0,
            is_liked: isLiked,
          };
        })
      );

      return postsWithDetails as GalleryPost[];
    },
  });
}

export function useGalleryPost(id: string) {
  return useQuery({
    queryKey: ["gallery-post", id],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      const { data: post, error } = await supabase
        .from("gallery_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Increment views
      await supabase
        .from("gallery_posts")
        .update({ views: (post.views || 0) + 1 })
        .eq("id", id);

      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("user_id", post.user_id)
        .maybeSingle();

      // Get likes count
      const { count: likesCount } = await supabase
        .from("gallery_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", id);

      let isLiked = false;
      if (userId) {
        const { data: like } = await supabase
          .from("gallery_likes")
          .select("id")
          .eq("post_id", id)
          .eq("user_id", userId)
          .maybeSingle();
        isLiked = !!like;
      }

      return {
        ...post,
        profiles: profile,
        likes_count: likesCount || 0,
        is_liked: isLiked,
        views: (post.views || 0) + 1,
      } as GalleryPost;
    },
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      if (!userId) throw new Error("로그인이 필요합니다");

      if (isLiked) {
        await supabase
          .from("gallery_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", userId);
      } else {
        await supabase
          .from("gallery_likes")
          .insert({ post_id: postId, user_id: userId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-posts"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-post"] });
    },
  });
}

export function useUploadGalleryPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description, imageFile }: { title: string; description?: string; imageFile: File }) => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      if (!userId) throw new Error("로그인이 필요합니다");

      // Upload image to storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(fileName);

      // Create post
      const { data, error } = await supabase
        .from("gallery_posts")
        .insert({
          user_id: userId,
          title,
          description,
          image_url: publicUrl,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-posts"] });
    },
  });
}
