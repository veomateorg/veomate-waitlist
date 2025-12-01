import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, ...updateData } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if we are in demo mode
    if (
      supabaseUrl === 'https://placeholder.supabase.co' ||
      supabaseKey === 'placeholder-anon-key'
    ) {
      // In demo mode, success is simulated by the client
      return NextResponse.json({ success: true });
    }

    const { error: dbError } = await supabase
      .from('waitlist')
      .update({
        first_name: updateData.firstName,
        last_name: updateData.lastName,
        country_code: updateData.countryCode,
        phone_number: updateData.phoneNumber,
        company_name: updateData.companyName || null,
        role: updateData.role || null,
        team_size: updateData.teamSize || null,
        hear_about: updateData.hearAbout || null,
        completed_signup: true,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
      .select();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Failed to update profile. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
