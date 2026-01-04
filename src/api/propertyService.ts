import { supabase } from "../lib/supabaseClient";

/**
 * Public: only published properties
 */
export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "published");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

/**
 * Public: single published property
 */
export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/**
 * Admin: fetch all properties
 */
export async function getAllPropertiesAdmin() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
