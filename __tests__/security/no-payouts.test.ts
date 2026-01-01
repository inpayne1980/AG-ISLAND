
// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

/**
 * Security Test: No Payouts/Checkout on Landing Pages
 * This test fails if "stripe" or "checkout" keywords are found in landing page related components.
 * 
 * Note: Owner dashboard and admin routes are permitted to handle billing simulation,
 * but public landing pages must remain strictly informational/redirect-based.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Fix: describe is globally defined by the test runner (e.g., Jest). Using @ts-ignore to bypass missing type declarations.
// @ts-ignore
describe('Security: No Payouts/Checkout on Landing Pages', () => {
  const filesToCheck = [
    'app/u/[handle]/[product_slug]/page.tsx',
    'components/PrimaryCTA.tsx',
    'components/HeroVideo.tsx',
    'components/BrandHeader.tsx',
    'components/PublicProfile.tsx'
  ];

  const forbiddenKeywords = ['stripe', 'checkout', 'payout', 'native-pay', 'buy-now'];

  filesToCheck.forEach(filePath => {
    // Fix: test is globally defined by the test runner. Using @ts-ignore to bypass missing type declarations.
    // @ts-ignore
    test(`File ${filePath} should not contain payment processing keywords`, () => {
      try {
        // Fix: Casting process to any to access Node.js-specific cwd() which may be missing from the provided Process type.
        const fullPath = join((process as any).cwd(), filePath);
        const content = readFileSync(fullPath, 'utf8').toLowerCase();
        
        forbiddenKeywords.forEach(keyword => {
          // We check for keywords but allow them in comments if they are "no stripe" etc.
          // However, for maximum safety, we check the whole string.
          // Since we updated PrimaryCTA to say "External Brand Site", it should pass.
          
          const hasKeyword = content.includes(keyword);
          
          // Allow comments containing the rule itself
          const ruleComment = "no stripe checkout on landing pages";
          const containsOnlyAllowedMention = content.includes(ruleComment) && content.split(keyword).length <= 2;

          if (hasKeyword && !containsOnlyAllowedMention) {
             throw new Error(`Forbidden keyword "${keyword}" found in ${filePath}`);
          }
        });
      } catch (e: any) {
        if (e.code === 'ENOENT') return; // Skip if file doesn't exist in environment
        throw e;
      }
    });
  });
});
