import { supabase } from "../src/lib/supabase";

/**
 * Kiểm tra user hiện tại có phải admin không
 * - Có session
 * - Có user_id trong bảng admins
 */
export async function isAdmin(): Promise<boolean> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return false;

  const { data, error: e2 } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (e2) return false;

  return !!data;
}

/**
 * Đăng nhập admin
 */
export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

/**
 * Đăng xuất
 */
export async function adminLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
