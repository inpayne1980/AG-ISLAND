
export interface GeneratedContent {
  id: string;
  original_url: string;
  hero_url?: string;
  status: 'pending_approval' | 'approved';
  variant_number: number;
  created_at: string;
  scheduled_at?: string; 
  color_palette?: string[]; 
  platform_previews?: {
    instagram: string;
    tiktok: string;
    twitter: string;
  };
}

export type PresetType = 
  | 'brighter' | 'softer' | 'high_contrast' | 'minimalist' 
  | 'dramatic' | 'vintage' | 'cinematic' | 'studio' 
  | 'cyberpunk' | 'watercolor' | '';

export interface PresetOption {
  value: PresetType;
  label: string;
  prompt: string;
}

export type ActionType = 'APPROVE' | 'BULK_APPROVE' | 'REGENERATE' | 'UPLOAD' | 'PUBLISH';

export interface ActionHistory {
  type: ActionType;
  ids: string[];
  prevData?: Record<string, string | undefined>;
}

export type ThemeType = 'clean' | 'bold' | 'minimal';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  isSpotlight?: boolean;
}

export interface CreatorProfile {
  handle: string;
  displayName: string;
  bio: string;
  avatar: string;
  theme: ThemeType;
  links: LinkItem[];
}

export type PlatformType = 'instagram' | 'tiktok' | 'twitter';

// Business & Analytics Types
export interface BrandDeal {
  id: string;
  brand: string;
  logo: string;
  title: string;
  description: string;
  budget_range: string;
  niche: string;
  external_url: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  source: string;
  date: string;
  status: 'pending' | 'cleared';
}

export interface AnalyticsMetric {
  label: string;
  value: string | number;
  trend: number; // percentage
  icon: string;
}

export interface SocialAccount {
  id: string;
  platform: PlatformType;
  username: string;
  isConnected: boolean;
  tokenExpires: string;
}

export interface RewardTier {
  referralsNeeded: number;
  reward: string;
  unlocked: boolean;
}

export interface SocialPost {
  id: string;
  content_id: string;
  platform: PlatformType;
  status: 'published' | 'scheduled' | 'failed';
  scheduled_at: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

// Subscription & Limits
export type SubscriptionTier = 'individual' | 'pro' | 'enterprise';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  status: 'active' | 'grace_period' | 'expired';
  graceEndsAt?: string;
  heroAdsLimit: number;
  socialAccountsLimit: number;
}

export interface UsageStats {
  heroAdsUsed: number;
  socialAccountsUsed: number;
}

// Security & Compliance
export interface SecurityAuditLog {
  id: string;
  event: string;
  status: 'success' | 'blocked' | 'warning';
  timestamp: string;
  ip: string;
}

export interface RateLimitState {
  uploads: number;
  generations: number;
  publishes: number;
}

export interface SecurityConfig {
  rlsEnabled: boolean;
  encryptionActive: boolean;
  twoFactorEnabled: boolean;
  allowlist: string[];
}
