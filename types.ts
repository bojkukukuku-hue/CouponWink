
export interface Store {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviewCount: number;
  category: string;
  activeCodes: number;
  successRate: number;
  featured?: boolean;
}

export interface Coupon {
  id: string;
  storeId: string;
  storeName: string;
  storeLogo: string;
  title: string;
  description: string;
  code?: string;
  type: 'code' | 'deal' | 'free-trial';
  discountValue: string;
  verified: boolean;
  popular?: boolean;
  expiryDate?: string;
  verifiedDate: string;
  usageCount: number;
  successRate: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
}
