import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if we're using mock credentials
    const isMock = process.env.NEXT_PUBLIC_SUPABASE_URL === undefined || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined;

    if (isMock) {
      console.log(`[Waitlist - MOCK] Captured email: ${email}`);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, message: 'Added to mock waitlist' }, { status: 200 });
    }

    // Real Supabase insertion
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select();

    if (error) {
      console.error('[Waitlist] Supabase error:', error);
      // Handle unique constraint violations
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: 'Already on the waitlist' }, { status: 200 });
      }
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('[Waitlist] API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
