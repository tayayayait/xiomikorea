import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Notice = Tables<"notices">;

export function useNotices(searchQuery: string = "") {
  return useQuery({
    queryKey: ["notices", searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Notice[];
    },
  });
}

export function useNotice(id: string) {
  return useQuery({
    queryKey: ["notice", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Notice;
    },
  });
}
