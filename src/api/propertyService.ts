import { supabase } from "../lib/supabaseClient";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: string;
  image?: string;
  gallery?: string[];
  agent_name?: string;
  agent_phone?: string;
  agent_whatsapp?: string;
}

// Fetch all properties
export const getProperties = async (): Promise<Property[]> => {
  const { data, error } = await supabase.from("properties").select("*");
  if (error) {
    console.error("Error fetching properties:", error.message);
    return [];
  }
  return data || [];
};

// Fetch single property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching property by ID:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching property:", err);
    return null;
  }
};
