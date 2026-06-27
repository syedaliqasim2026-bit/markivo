// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  phone?: string;
  status: 'online' | 'offline' | 'away';
  createdAt: Date;
  updatedAt: Date;
}

export interface Owner extends User {
  totalUsers: number;
  totalActiveUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  visitorsCount: number;
  subscribersCount: number;
}

// Vendor Types
export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  rating: number;
  totalProducts: number;
  totalSales: number;
  status: 'active' | 'inactive' | 'suspended';
  userId: string;
  createdAt: Date;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  subcategory?: string;
  vendorId: string;
  rating: number;
  reviews: Review[];
  stock: number;
  sku: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
}

// Order Types
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  discount?: number;
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: 'card' | 'paypal' | 'easypay' | 'jazzcash' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Address Types
export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'easypay' | 'jazzcash';
  isDefault: boolean;
  lastFour?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'file' | 'voice';
  fileUrl?: string;
  createdAt: Date;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage: ChatMessage;
  unreadCount: number;
}

// Advertisement Types
export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  type: 'banner' | 'video' | 'sponsored'
  position: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  clicks: number;
  impressions: number;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  expiryDate: Date;
  isActive: boolean;
}

// Settings Types
export interface BrandSettings {
  siteName: string;
  slogan: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface AppSettings {
  currency: string;
  language: string;
  timezone: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  twoFactorAuth: boolean;
}
