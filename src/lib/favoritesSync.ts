import { supabase } from "./supabaseClient";
import { getFavorites, toggleFavorite } from "./favorites";

export async function syncFavoritesOnLogin(userId: string) {
  const local = getFavorites();

  if (local.length === 0) return;

  const rows = local.map(property_id => ({
    user_id: userId,
    property_id
  }));

  await supabase.from("favorites").upsert(rows);
}

export async function fetchFavoritesFromSupabase(userId: string) {
  const { data } = await supabase
    .from("favorites")
    .select("property_id")
    .eq("user_id", userId);

  return data?.map(f => f.property_id) || [];
}
