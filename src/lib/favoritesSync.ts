 import { supabase } from "./supabaseClient";
import { getFavorites, clearFavorites } from "./favorites";

export async function syncFavoritesOnLogin(userId: string) {
  const localFavorites = getFavorites();

  if (localFavorites.length === 0) return;

  const rows = localFavorites.map((propertyId: string) => ({
    user_id: userId,
    property_id: propertyId
  }));

  await supabase.from("favorites").upsert(rows, {
    onConflict: "user_id,property_id"
  });

  clearFavorites();
}

export async function fetchFavoritesFromSupabase(userId: string) {
  const { data } = await supabase
    .from("favorites")
    .select("property_id")
    .eq("user_id", userId);

  return data ? data.map(r => r.property_id) : [];
}