
// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import { PresetOption, CreatorProfile, RewardTier, SocialAccount, BrandDeal, PaymentRecord, SubscriptionStatus, SecurityAuditLog } from './types';

export const PRESETS: PresetOption[] = [
  { value: 'brighter', label: 'Brighter', prompt: 'Make this product image much brighter, well-lit, and professionally vibrant. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'softer', label: 'Softer', prompt: 'Give this product image a soft, elegant glow with gentle shadows and a professional aesthetic. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'high_contrast', label: 'High Contrast', prompt: 'Increase contrast and sharpness. Make the product pop against its background dramatically. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'minimalist', label: 'Minimalist', prompt: 'Apply a clean, minimalist studio lighting style with a neutral background. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'dramatic', label: 'Dramatic', prompt: 'Add dramatic, cinematic lighting to the product for a luxury feel. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'vintage', label: 'Vintage Film', prompt: 'Apply a vintage film aesthetic with warm tones, subtle film grain, and a nostalgic 1970s photography style. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'cinematic', label: 'Cinematic', prompt: 'Give the product image a cinematic movie-like appearance with dramatic teal and orange color grading and professional anamorphic lighting. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'studio', label: 'Pro Studio', prompt: 'Place the product in a high-end professional studio setting with perfect 3-point lighting and a clean, seamless backdrop. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'cyberpunk', label: 'Cyberpunk', prompt: 'Reimagine the product in a futuristic cyberpunk setting with vibrant neon lights, rain-slicked surfaces, and a high-tech atmosphere. NO creator payouts, NO native checkout, NO self-serve billing.' },
  { value: 'watercolor', label: 'Watercolor', prompt: 'Transform the product presentation into a beautiful, artistic watercolor painting with soft edges and vibrant pigment bleeds. NO creator payouts, NO native checkout, NO self-serve billing.' },
];

export const MOCK_PROFILE: CreatorProfile = {
  handle: 'alex_creator',
  displayName: 'Alex Rivers',
  bio: 'Visual artist reimagining product aesthetics with AdGenius AI. ✨',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  theme: 'clean',
  links: [
    { id: 'l1', title: 'Shop My Latest Drop', url: 'https://shop.example.com', clicks: 124, isSpotlight: true },
    { id: 'l2', title: 'Follow on Instagram', url: 'https://instagram.com', clicks: 450 },
    { id: 'l3', title: 'Portfolio Website', url: 'https://alexrivers.art', clicks: 89 },
  ]
};

export const BRAND_DEALS: BrandDeal[] = [
  {
    id: 'bd1',
    brand: 'Lumina Tech',
    logo: 'https://logo.clearbit.com/lumina.com',
    title: 'Smart Home Campaign',
    description: 'Looking for high-fidelity AI renders of our latest smart lighting system in minimalist environments.',
    budget_range: '$2,000 - $5,000',
    niche: 'Tech',
    external_url: 'https://example.com/apply/lumina'
  },
  {
    id: 'bd2',
    brand: 'Vogue Essentials',
    logo: 'https://logo.clearbit.com/vogue.com',
    title: 'Winter Lookbook AI',
    description: 'Create 10 AI-generated variants of our seasonal accessories for social media promotion.',
    budget_range: '$1,500 - $3,000',
    niche: 'Fashion',
    external_url: 'https://example.com/apply/vogue'
  }
];

export const MOCK_PAYMENTS: PaymentRecord[] = [
  { id: 'p1', amount: 1250, source: 'Lumina Tech', date: '2024-10-12', status: 'cleared' },
  { id: 'p2', amount: 800, source: 'Vogue Essentials', date: '2024-10-15', status: 'pending' },
];

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  { id: 'sa1', platform: 'instagram', username: '@alex_renders', isConnected: true, tokenExpires: '2024-12-31' },
  { id: 'sa2', platform: 'tiktok', username: '@alex_renders_ai', isConnected: false, tokenExpires: '' },
];

export const REWARD_TIERS: RewardTier[] = [
  { referralsNeeded: 1, reward: "+2 AI Hero Variants", unlocked: true },
  { referralsNeeded: 3, reward: "+1 Social Account Link", unlocked: false },
  { referralsNeeded: 5, reward: "1 Free Month Pro", unlocked: false },
];

export const MOCK_SUBSCRIPTION: SubscriptionStatus = {
  tier: 'individual',
  status: 'active',
  heroAdsLimit: 5,
  socialAccountsLimit: 3
};

export const MOCK_SECURITY_LOGS: SecurityAuditLog[] = [
  { id: '1', event: 'AES-256 Token Decryption', status: 'success', timestamp: '2 minutes ago', ip: '192.168.1.1' },
  { id: '2', event: 'Rate Limit Threshold (Uploads)', status: 'warning', timestamp: '1 hour ago', ip: '203.0.113.42' },
  { id: '3', event: 'Blocked Malicious Redirect', status: 'blocked', timestamp: '3 hours ago', ip: '45.12.33.102' },
  { id: '4', event: 'Owner 2FA Verification', status: 'success', timestamp: '5 hours ago', ip: '192.168.1.1' },
];

export const MOCK_ALLOWLIST = ['shop.example.com', 'instagram.com', 'alexrivers.art', 'tiktok.com', 'twitter.com'];

export const INITIAL_MOCK_DATA: any[] = [
  {
    id: '1',
    original_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    hero_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    status: 'pending_approval',
    variant_number: 1,
    created_at: new Date().toISOString()
  }
];
