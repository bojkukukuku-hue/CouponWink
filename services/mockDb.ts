
const STORES_KEY = 'couponwink_stores';
const COUPONS_KEY = 'couponwink_coupons';
const CATEGORIES_KEY = 'couponwink_categories';
const SETTINGS_KEY = 'couponwink_settings';

const INITIAL_CATEGORIES = [
  { id: '1', name: "AI Writing Tools", icon: "edit", description: "AI-powered writing assistance tools.", storeCount: 0 },
  { id: '2', name: "Web Hosting", icon: "dns", description: "Website and cloud storage services.", storeCount: 0 },
  { id: '3', name: "SEO Tools", icon: "trending_up", description: "Search engine optimization and analysis.", storeCount: 0 },
  { id: '4', name: "Productivity", icon: "assignment_turned_in", description: "Tools to help you get more done.", storeCount: 0 },
  { id: '5', name: "Design Tools", icon: "brush", description: "Graphic design and creative software.", storeCount: 0 },
];

const INITIAL_STORES = [
  { 
    id: 'jasper', 
    name: "Jasper AI", 
    category: "AI Writing Tools", 
    logo: "psychology", 
    useCustomImage: false,
    color: "text-pink-500", 
    rating: 4.7, 
    reviews: 892,
    deals: 2, 
    status: 'Active',
    description: "Leading AI content writing tool for marketing teams. Create blog posts 10x faster.",
    website: "https://jasper.ai"
  },
  { 
    id: 'cloudways', 
    name: "Cloudways", 
    category: "Web Hosting", 
    logo: "cloud", 
    useCustomImage: false,
    color: "text-blue-400", 
    rating: 4.8, 
    reviews: 1243,
    deals: 1, 
    status: 'Active',
    description: "High-performance managed cloud hosting platform. Simplified server management.",
    website: "https://cloudways.com"
  },
];

const INITIAL_COUPONS = [
  { 
    id: '1', 
    storeId: 'jasper', 
    title: '7-Day Free Trial', 
    code: 'JASPERFREE', 
    type: 'Trial', 
    label: 'FREE', 
    status: 'Active', 
    usage: 1240, 
    expiry: '2025-12-31',
    desc: 'Try Jasper AI free for 7 days with full access to all features.',
    link: 'https://jasper.ai/free-trial'
  },
  { 
    id: '2', 
    storeId: 'cloudways', 
    title: '40% Off for 4 Months', 
    code: 'CLW40', 
    type: 'Code', 
    label: '40% OFF', 
    status: 'Active', 
    usage: 890, 
    expiry: '2024-12-31',
    desc: 'Get 40% discount on all Cloudways hosting plans for your first 4 months.',
    link: 'https://cloudways.com/pricing'
  },
];

export const MockDB = {
  getStores: () => {
    const data = localStorage.getItem(STORES_KEY);
    if (!data) {
      localStorage.setItem(STORES_KEY, JSON.stringify(INITIAL_STORES));
      return INITIAL_STORES;
    }
    return JSON.parse(data);
  },
  saveStore: (store: any) => {
    const stores = MockDB.getStores();
    const index = stores.findIndex((s: any) => s.id === store.id);
    if (index > -1) stores[index] = store;
    else stores.push(store);
    localStorage.setItem(STORES_KEY, JSON.stringify(stores));
  },
  deleteStore: (id: string) => {
    const stores = MockDB.getStores().filter((s: any) => s.id !== id);
    localStorage.setItem(STORES_KEY, JSON.stringify(stores));
  },

  getCoupons: () => {
    const data = localStorage.getItem(COUPONS_KEY);
    if (!data) {
      localStorage.setItem(COUPONS_KEY, JSON.stringify(INITIAL_COUPONS));
      return INITIAL_COUPONS;
    }
    return JSON.parse(data);
  },
  saveCoupon: (coupon: any) => {
    const coupons = MockDB.getCoupons();
    const index = coupons.findIndex((c: any) => c.id === coupon.id);
    if (index > -1) coupons[index] = coupon;
    else coupons.push({ ...coupon, id: Date.now().toString() });
    localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
  },
  deleteCoupon: (id: string) => {
    const coupons = MockDB.getCoupons().filter((c: any) => c.id !== id);
    localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
  },

  getCategories: () => {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (!data) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(data);
  },
  saveCategory: (cat: any) => {
    const cats = MockDB.getCategories();
    const index = cats.findIndex((c: any) => c.id === cat.id);
    if (index > -1) cats[index] = cat;
    else cats.push({ ...cat, id: Date.now().toString() });
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
  },
  deleteCategory: (id: string) => {
    const cats = MockDB.getCategories().filter((c: any) => c.id !== id);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
  },

  getSettings: () => {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : null;
  },
  saveSettings: (settings: any) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Apply globally
    if (settings.metaTitle) document.title = settings.metaTitle;
  }
};
