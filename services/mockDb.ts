
const API_URL = 'api.php';

const DEFAULT_SETTINGS = {
  siteName: 'CouponWink',
  primaryColor: '#10b981',
  secondaryColor: '#0B2447',
  textColor: '#1e293b',
  supportEmail: 'support@couponwink.com',
  metaTitle: 'CouponWink - Best AI & Hosting Deals',
  metaDescription: 'Verified promo codes for AI tools and hosting.',
  fontFamily: 'Plus Jakarta Sans',
  fontSizeBody: '16px',
  fontSizeH1: '64px',
  fontSizeH2: '32px',
  showSaleBanner: true,
  saleBannerText: 'Black Friday Deals are here! Save up to 90% on top AI tools.',
  saleBannerLink: '/search?q=black+friday',
  homepage: {
    trendingCount: 6,
    categoryCount: 8,
    dealsCount: 3,
    trendingSort: 'featured', // 'featured', 'latest', 'clicks'
    categorySort: 'name', // 'name', 'latest', 'clicks'
    dealsSort: 'latest' // 'latest', 'usage'
  },
  display: {
    sidebarStoreCount: 3,
    footerCategoryCount: 4,
    footerStoreCount: 4
  }
};

const SEED_DATA = {
  stores: [
    { id: 'jasper', name: 'Jasper AI', category: 'AI Writing', logo: 'psychology', color: 'text-purple-500', rating: 4.8, reviews: 1250, status: 'Active', description: 'Advanced AI content platform for teams. Create blog posts, marketing copy, and images.', website: 'https://jasper.ai', featured: true, clicks: 1500, createdAt: '2025-01-01T10:00:00Z' },
    { id: 'copyai', name: 'Copy.ai', category: 'AI Writing', logo: 'content_copy', color: 'text-emerald-500', rating: 4.7, reviews: 920, status: 'Active', description: 'Generate high-converting marketing copy in seconds.', website: 'https://copy.ai', featured: true, clicks: 1200, createdAt: '2025-01-05T10:00:00Z' },
    { id: 'midjourney', name: 'Midjourney', category: 'AI Images', logo: 'palette', color: 'text-indigo-500', rating: 4.9, reviews: 3500, status: 'Active', description: 'The leading AI image generator for artistic visuals.', website: 'https://midjourney.com', featured: true, clicks: 3500, createdAt: '2025-01-10T10:00:00Z' },
    { id: 'cloudways', name: 'Cloudways', category: 'Web Hosting', logo: 'cloud', color: 'text-blue-500', rating: 4.7, reviews: 850, status: 'Active', description: 'Managed multi-cloud hosting for digital agencies.', website: 'https://cloudways.com', featured: true, clicks: 850, createdAt: '2025-01-15T10:00:00Z' },
    { id: 'hostinger', name: 'Hostinger', category: 'Web Hosting', logo: 'dns', color: 'text-indigo-600', rating: 4.6, reviews: 2100, status: 'Active', description: 'Fast and affordable web hosting for beginners.', website: 'https://hostinger.com', featured: true, clicks: 2100, createdAt: '2025-01-20T10:00:00Z' },
    { id: 'nordvpn', name: 'NordVPN', category: 'VPN & Security', logo: 'security', color: 'text-blue-800', rating: 4.7, reviews: 8900, status: 'Active', description: 'World\'s leading VPN provider with top security.', website: 'https://nordvpn.com', featured: true, clicks: 4500, createdAt: '2025-01-25T10:00:00Z' }
  ],
  categories: [
    { id: 'ai-writing', name: 'AI Writing', icon: 'edit_note', description: 'Best discounts on AI writing assistants.' },
    { id: 'ai-images', name: 'AI Images', icon: 'image', description: 'Promo codes for AI art generators.' },
    { id: 'hosting', name: 'Web Hosting', icon: 'cloud', description: 'Verified codes for cloud and VPS hosting.' }
  ],
  coupons: [
    { id: 'j1', storeId: 'jasper', title: '20% Off Annual Plans', code: 'JASPER20', type: 'Code', label: '20% OFF', status: 'Active', usage: 450, expiry: '2025-12-31', desc: 'Save on all annual subscriptions.' },
    { id: 'c1', storeId: 'cloudways', title: 'Free $25 Hosting Credit', code: 'WINK25', type: 'Code', label: '$25 FREE', status: 'Active', usage: 1200, expiry: '2025-12-31', desc: 'Get $25 credit to start hosting.' }
  ],
  menus: [
    { id: 'm1', label: 'Home', path: '/', visible: 1, sort_order: 1 },
    { id: 'm2', label: 'Categories', path: '/categories', visible: 1, sort_order: 2 },
    { id: 'm3', label: 'Stores', path: '/search', visible: 1, sort_order: 3 },
    { id: 'm4', label: 'Blog', path: '/blog', visible: 1, sort_order: 4 }
  ]
};

async function apiFetch(action: string, method: string = 'GET', data: any = null) {
  try {
    const url = `${API_URL}?action=${action}${method === 'DELETE' && data?.id ? `&id=${data.id}` : ''}`;
    const options: any = {
      method: method === 'DELETE' ? 'DELETE' : (method === 'POST' ? 'POST' : 'GET'),
      headers: { 'Content-Type': 'application/json' },
    };
    if (data && method === 'POST') options.body = JSON.stringify(data);
    
    const response = await fetch(url, options);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

export const MockDB = {
  _cache: {
    stores: [] as any[],
    coupons: [] as any[],
    categories: [] as any[],
    settings: {} as any,
    menus: [] as any[],
    blogs: [] as any[],
    user: null as any
  },

  async init() {
    const [stores, coupons, categories, settings, menus, blogs] = await Promise.all([
        apiFetch('get_stores'),
        apiFetch('get_coupons'),
        apiFetch('get_categories'),
        apiFetch('get_settings'),
        apiFetch('get_menus'),
        apiFetch('get_blogs')
    ]);

    // Load from LocalStorage if API fails
    const localStores = JSON.parse(localStorage.getItem('cw_stores') || '[]');
    const localCoupons = JSON.parse(localStorage.getItem('cw_coupons') || '[]');
    const localCategories = JSON.parse(localStorage.getItem('cw_categories') || '[]');
    const localSettings = JSON.parse(localStorage.getItem('cw_settings') || '{}');
    const localMenus = JSON.parse(localStorage.getItem('cw_menus') || '[]');
    const localBlogs = JSON.parse(localStorage.getItem('cw_blogs') || '[]');

    this._cache.stores = (stores && stores.length > 0) ? stores : (localStores.length > 0 ? localStores : SEED_DATA.stores);
    this._cache.coupons = (coupons && coupons.length > 0) ? coupons : (localCoupons.length > 0 ? localCoupons : SEED_DATA.coupons);
    this._cache.categories = (categories && categories.length > 0) ? categories : (localCategories.length > 0 ? localCategories : SEED_DATA.categories);
    
    const dbSettings = (settings && Object.keys(settings).length > 0) ? settings : localSettings;
    this._cache.settings = { ...DEFAULT_SETTINGS, ...dbSettings };
    
    // Ensure nested objects exist
    if (!this._cache.settings.homepage) {
      this._cache.settings.homepage = { ...DEFAULT_SETTINGS.homepage };
    }
    if (!this._cache.settings.display) {
      this._cache.settings.display = { ...DEFAULT_SETTINGS.display };
    }

    this._cache.menus = (menus && menus.length > 0) ? menus : (localMenus.length > 0 ? localMenus : SEED_DATA.menus);
    this._cache.blogs = (blogs && blogs.length > 0) ? blogs : localBlogs;

    const savedSession = localStorage.getItem('cw_user');
    if (savedSession) {
      try {
        this._cache.user = JSON.parse(savedSession);
      } catch (e) {
        localStorage.removeItem('cw_user');
      }
    }

    this.applyGlobalSettings(this._cache.settings);
  },

  async login(username: string, pass: string) {
    try {
      const result = await apiFetch('login', 'POST', { username, password: pass });
      if (result && result.success) {
        this._cache.user = result.user;
        localStorage.setItem('cw_user', JSON.stringify(result.user));
        return { success: true };
      }
    } catch (e) {
      console.warn('API Login failed, trying local fallback');
    }

    // Local Fallback for preview environment
    if ((username === 'admin' || username === 'admin@couponwink.com') && pass === 'admin123') {
      const mockUser = { id: 1, username: 'admin', email: 'admin@couponwink.com', role: 'Admin' };
      this._cache.user = mockUser;
      localStorage.setItem('cw_user', JSON.stringify(mockUser));
      return { success: true };
    }

    return { success: false, message: 'Tài khoản hoặc mật khẩu không chính xác.' };
  },

  logout() {
    this._cache.user = null;
    localStorage.removeItem('cw_user');
    window.location.href = '/login';
  },

  isLoggedIn() {
    return !!this._cache.user;
  },

  isAdmin() {
    return this._cache.user?.role === 'Admin';
  },

  getCurrentUser() {
    return this._cache.user;
  },

  getStores: () => MockDB._cache.stores,
  getCoupons: () => MockDB._cache.coupons,
  getCategories: () => MockDB._cache.categories,
  getBlogs: () => MockDB._cache.blogs,
  getMenus: () => MockDB._cache.menus.sort((a, b) => a.sort_order - b.sort_order),
  getSettings: () => MockDB._cache.settings,

  async saveStore(store: any) { 
    if (!store.id) store.id = store.name.toLowerCase().replace(/\s+/g, '-');
    if (!store.createdAt) store.createdAt = new Date().toISOString();
    if (store.clicks === undefined) store.clicks = 0;
    
    try {
      await apiFetch('save_store', 'POST', store); 
    } catch (e) {}

    // LocalStorage fallback
    const stores = JSON.parse(localStorage.getItem('cw_stores') || '[]');
    const index = stores.findIndex((s: any) => s.id === store.id);
    if (index > -1) stores[index] = store;
    else stores.push(store);
    localStorage.setItem('cw_stores', JSON.stringify(stores));

    await this.init(); 
  },
  async deleteStore(id: string) { await apiFetch('delete_store', 'DELETE', { id }); await this.init(); },
  async saveCoupon(coupon: any) { 
    if (!coupon.id) coupon.id = 'c-' + Math.random().toString(36).substr(2, 9);
    if (!coupon.createdAt) coupon.createdAt = new Date().toISOString();
    if (coupon.usage === undefined) coupon.usage = 0;
    
    try {
      await apiFetch('save_coupon', 'POST', coupon); 
    } catch (e) {}

    const coupons = JSON.parse(localStorage.getItem('cw_coupons') || '[]');
    const index = coupons.findIndex((c: any) => c.id === coupon.id);
    if (index > -1) coupons[index] = coupon;
    else coupons.push(coupon);
    localStorage.setItem('cw_coupons', JSON.stringify(coupons));

    await this.init(); 
  },
  async deleteCoupon(id: string) { await apiFetch('delete_coupon', 'DELETE', { id }); await this.init(); },
  async saveCategory(cat: any) { 
    if (!cat.id) cat.id = cat.name.toLowerCase().replace(/\s+/g, '-');
    if (!cat.createdAt) cat.createdAt = new Date().toISOString();
    if (cat.clicks === undefined) cat.clicks = 0;
    
    try {
      await apiFetch('save_category', 'POST', cat); 
    } catch (e) {}

    const cats = JSON.parse(localStorage.getItem('cw_categories') || '[]');
    const index = cats.findIndex((c: any) => c.id === cat.id);
    if (index > -1) cats[index] = cat;
    else cats.push(cat);
    localStorage.setItem('cw_categories', JSON.stringify(cats));

    await this.init(); 
  },
  async deleteCategory(id: string) { await apiFetch('delete_category', 'DELETE', { id }); await this.init(); },
  async saveBlog(blog: any) { await apiFetch('save_blog', 'POST', blog); await this.init(); },
  async deleteBlog(id: string) { await apiFetch('delete_blog', 'DELETE', { id }); await this.init(); },
  async saveMenus(menus: any[]) { await apiFetch('save_menus', 'POST', menus); await this.init(); },
  async saveSettings(settings: any) { 
    try {
      await apiFetch('save_settings', 'POST', settings); 
    } catch (e) {}
    localStorage.setItem('cw_settings', JSON.stringify(settings));
    this._cache.settings = settings;
    this.applyGlobalSettings(settings);
  },

  applyGlobalSettings(settings: any) {
    if (!settings) return;
    if (settings.metaTitle) document.title = settings.metaTitle;
    let themeStyle = document.getElementById('cw-theme-variables');
    if (!themeStyle) {
      themeStyle = document.createElement('style');
      themeStyle.id = 'cw-theme-variables';
      document.head.appendChild(themeStyle);
    }
    themeStyle.innerHTML = `
      :root {
        --primary-color: ${settings.primaryColor || '#10b981'};
      }
    `;
  }
};
