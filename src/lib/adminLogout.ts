import { supabase } from "./supabaseClient";

export async function adminLogout() {
  await supabase.auth.signOut();
  localStorage.clear();
  window.location.href = "/admin-login";
}
