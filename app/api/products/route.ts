// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

/**
 * Simulated Next.js API Route for Product Handling
 * In a real Next.js environment, this would be in app/api/products/route.ts
 */

import { supabase } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image_url, brand, product_url, user_id } = body;

    // 1. Save to Supabase
    const { data: product, error: insertError } = await supabase
      .from('products')
      .insert({
        user_id,
        image_url,
        brand,
        product_url,
        status: 'processing'
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // 2. Call Webhook (Simulated)
    // In a real app, this might trigger a Vercel background job or a separate worker
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/webhooks/trigger-ugc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          imageUrl: image_url,
          brand,
          context: 'INITIAL_UPLOAD'
        })
      });
    } catch (webhookError) {
      console.warn("Webhook trigger failed (optional):", webhookError);
    }

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}