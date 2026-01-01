
import { supabase } from '../../../../lib/supabase';

/**
 * POST /api/billing/activate
 * Owner-only endpoint to trigger Pro activation.
 * Strictly simulates external Stripe session (Constraint 8.5).
 */
export async function POST(req: Request) {
  try {
    const { userId, adminEmail } = await req.json();

    // Security: Only the allowlisted admin can trigger this
    if (adminEmail !== 'admin@vendo.bio') {
      return new Response(JSON.stringify({ error: 'Unauthorized Access' }), { status: 403 });
    }

    console.log(`[BILLING] Initiating Stripe Checkout for User: ${userId} (Price: prod_VendoPro)`);

    // In a real implementation, you would use the Stripe SDK:
    // const session = await stripe.checkout.sessions.create({
    //   line_items: [{ price: 'prod_VendoPro', quantity: 1 }],
    //   mode: 'subscription',
    //   success_url: `${origin}/owner?success=true`,
    //   cancel_url: `${origin}/owner?canceled=true`,
    //   customer_email: userEmail
    // });

    // For the sandbox, we simulate a successful redirect/webhook cycle by updating the DB directly
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        tier: 'pro',
        status: 'active',
        monthly_limit: 5, // Strictly enforced as per prompt
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Pro Tier Activated via Simulated Stripe Session',
      tier: data.tier,
      limit: data.monthly_limit
    }), { status: 200 });

  } catch (err: any) {
    console.error('[BILLING ERROR]', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
