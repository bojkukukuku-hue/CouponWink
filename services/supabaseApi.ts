import { supabase } from "../src/lib/supabase";

/* =========================
   AUTH / ADMIN
========================= */

export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function adminLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session?.user ?? null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return false;
  return !!data;
}

/* =========================
   COUPONS (ADMIN)
========================= */

export async function listCouponsAdmin() {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCouponAdmin(id: string) {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createCouponAdmin(payload: any) {
  const { data, error } = await supabase
    .from("coupons")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateCouponAdmin(id: string, payload: any) {
  const { data, error } = await supabase
    .from("coupons")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCouponAdmin(id: string) {
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) throw error;
}

/* =========================
   BLOG POSTS (ADMIN)
========================= */

export async function listPostsAdmin() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPostAdmin(id: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createPostAdmin(payload: any) {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updatePostAdmin(id: string, payload: any) {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deletePostAdmin(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

/** publish/unpublish */
export async function setPostPublishAdmin(id: string, is_published: boolean) {
  const payload: any = {
    is_published,
    published_at: is_published ? new Date().toISOString() : null,
  };

  const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
  if (error) throw error;
}

/* =========================
   PUBLIC: STORES / CATEGORIES
========================= */

export async function listStoresPublic() {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getStorePublic(id: string) {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function listCategoriesPublic() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/* =========================
   PUBLIC: COUPONS
========================= */

export async function listActiveCouponsPublic() {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/** Coupons by store (public) */
export async function listActiveCouponsByStorePublic(storeId: string) {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("is_active", true)
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/** Alias cho đúng tên bạn dùng ở trang StoreDetail */
export async function listCouponsByStorePublic(storeId: string) {
  return listActiveCouponsByStorePublic(storeId);
}

/** Coupons by category (public) */
export async function listActiveCouponsByCategoryPublic(categoryId: string) {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/** Search (public) - dùng cho SearchResultsPage */
export async function searchCouponsPublic(opts: { query?: string; category?: string }) {
  const q = (opts.query || "").trim();
  const cat = (opts.category || "").trim();

  // Query cơ bản: coupons active + join stores để lấy store name
  let query = supabase
    .from("coupons")
    .select("*, stores(name)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  // search theo title/code/description (tuỳ schema bạn có field gì)
  if (q) {
    query = query.or(`title.ilike.%${q}%,code.ilike.%${q}%,description.ilike.%${q}%`);
  }

  // filter theo category_id hoặc category name (tuỳ bạn đang truyền)
  if (cat) {
    // Nếu bạn truyền category là name thì bạn cần join categories hoặc map name->id.
    // Ở đây mình ưu tiên: nếu cat là UUID thì dùng category_id
    const looksUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cat);
    if (looksUuid) query = query.eq("category_id", cat);
  }

  const { data, error } = await query;

  if (error) throw error;

  // map lại cho UI dễ dùng
  return (data ?? []).map((c: any) => ({
    ...c,
    store_name: c.stores?.name || "",
  }));
}

/* =========================
   PUBLIC: BLOG
========================= */

export async function listPublishedPostsPublic() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPublishedPostBySlugPublic(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) throw error;
  return data;
}
