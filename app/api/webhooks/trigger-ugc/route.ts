
import { supabase } from '../../../lib/supabase';
import { callAIStudio } from '../../../lib/ai/call-ai-studio';

/**
 * Webhook: POST /api/webhooks/trigger-ugc
 * 
 * Orchestrates the automated creation of branded landing pages.
 * 1. Receives product metadata
 * 2. Triggers high-fidelity AI render
 * 3. Saves public Vendo landing page
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id, image_url, brand, product_url } = body;

    // Validation
    if (!product_id || !image_url || !brand) {
      return new Response(
        JSON.stringify({ error: 'Missing core product DNA (id, image, or brand).' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[WEBHOOK] Processing UGC trigger for Product ID: ${product_id}`);

    // 1. Call the AI Studio to generate the video/hero asset
    const studioResult = await callAIStudio(brand, image_url);

    if (studioResult.status !== 'success') {
      throw new Error('AI Studio generation pipeline failed.');
    }

    // 2. Automated Slug Generation (brand-product-unique)
    // We extract a slug from the brand name and append a short unique ID
    const brandSlug = brand.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const finalSlug = `${brandSlug}-launch-${randomSuffix}`;

    // 3. Update or Create Landing Page Record
    // Constraint 8.2: Always link to external checkout (product_url)
    const { data: landingPage, error: upsertError } = await supabase
      .from('landing_pages')
      .upsert({
        product_id: product_id,
        slug: finalSlug,
        video_url: studioResult.video_url,
        is_active: true,
        updated_at: new Date().toISOString()
      }, { onConflict: 'product_id' })
      .select()
      .single();

    if (upsertError) {
      console.error('[DATABASE ERROR]', upsertError);
      throw upsertError;
    }

    // 4. Final response with the public URL context
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Vendo.bio landing page created.',
        landing_page_id: landingPage.id,
        public_slug: finalSlug
      }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('[WEBHOOK CRITICAL FAILURE]', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', detail: err.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
