import { supabase } from "../src/lib/supabase";

// AUTH
export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}
export async function adminLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
export async function isAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return !!data;
}

// COUPONS
export async function listCouponsAdmin() {
  const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
export async function createCouponAdmin(payload: any) {
  const { data, error } = await supabase.from("coupons").insert(payload).select("*").single();
  if (error) throw error;
  return data;
}
export async function updateCouponAdmin(id: string, payload: any) {
  const { data, error } = await supabase.from("coupons").update(payload).eq("id", id).select("*").single();
  if (error) throw error;
  return data;
}
export async function deleteCouponAdmin(id: string) {
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) throw error;
}

// BLOG
export async function listPostsAdmin() {
  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
export async function createPostAdmin(payload: any) {
  const { data, error } = await supabase.from("blog_posts").insert(payload).select("*").single();
  if (error) throw error;
  return data;
}
export async function updatePostAdmin(id: string, payload: any) {
  const { data, error } = await supabase.from("blog_posts").update(payload).eq("id", id).select("*").single();
  if (error) throw error;
  return data;
}
export async function deletePostAdmin(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}
