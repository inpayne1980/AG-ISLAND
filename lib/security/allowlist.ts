// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

/**
 * Vendo.bio Security: Domain Allowlist
 * Only verified e-commerce platforms and approved brand domains are permitted.
 * Constraint 8.2: Always link to external checkouts.
 */

export const ALLOWLIST_DOMAINS = [
  'shopify.com',
  'myshopify.com',
  'coca-cola.com',
  'amazon.com',
  'etsy.com',
  'nike.com',
  'adidas.com',
  'apple.com',
  'walmart.com',
  'target.com'
];

/**
 * Validates if a URL's domain or sub-domain is in the allowlist.
 */
export function isUrlAllowed(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    
    // Check if the hostname ends with any of the allowed domains
    // This allows subdomains like store.nike.com or my-shop.myshopify.com
    return ALLOWLIST_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch (e) {
    return false;
  }
}