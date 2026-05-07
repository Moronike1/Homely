import { supabase } from "../lib/supabaseClient";

/**
 * Public Properties
 * Only published and available
 */
export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_published", true)
    .ilike("status", "available")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProperties error:", error);
    return [];
  }

  return data || [];
}

/**
 * Public Single Property
 */
export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .ilike("status", "available")
    .single();

  if (error) {
    console.error("getPropertyById error:", error);
    return null;
  }

  return data;
}

/**
 * Featured Properties
 */
export async function getFeaturedProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_published", true)
    .ilike("status", "available")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getFeaturedProperties error:", error);
    return [];
  }

  return data || [];
}

/**
 * Admin: Fetch ALL properties
 */
export async function getAllPropertiesAdmin() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPropertiesAdmin error:", error);
    return [];
  }

  return data || [];
}
