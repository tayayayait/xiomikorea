import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Comment = Tables<"comments"> & {
  profiles?: { username: string; avatar_url: string | null } | null;
};

export function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get profiles for each comment
      const commentsWithProfiles = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("user_id", comment.user_id)
            .maybeSingle();

          return {
            ...comment,
            profiles: profile,
          };
        })
      );

      return commentsWithProfiles as Comment[];
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      if (!userId) throw new Error("로그인이 필요합니다");

      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: userId,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("user_id", userId)
        .maybeSingle();

      return { ...data, profiles: profile } as Comment;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, postId }: { commentId: string; postId: string }) => {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
      return postId;
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
