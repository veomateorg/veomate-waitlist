import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);


const ipRateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 10;

function getIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return 'unknown';
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }


    const cookieStore = await cookies();
    const submissionCookie = cookieStore.get('veomate_submission_count');
    const submissionCount = submissionCookie ? parseInt(submissionCookie.value, 10) : 0;

    if (submissionCount >= 5) {
      return NextResponse.json(
        { error: 'You have reached the maximum limit of 5 email submissions' },
        { status: 429 }
      );
    }


    const ip = getIp(request);
    if (ip !== 'unknown') {
      const now = Date.now();
      const record = ipRateLimit.get(ip) || { count: 0, lastReset: now };

      if (now - record.lastReset > RATE_LIMIT_WINDOW) {
        record.count = 0;
        record.lastReset = now;
      }

      if (record.count >= MAX_REQUESTS_PER_IP) {
        return NextResponse.json(
          { error: 'Too many requests from this IP. Please try again later.' },
          { status: 429 }
        );
      }

      record.count += 1;
      ipRateLimit.set(ip, record);
    }


    if (
      supabaseUrl === 'https://placeholder.supabase.co' ||
      supabaseKey === 'placeholder-anon-key'
    ) {

    } else {
      const { error: dbError } = await supabase
        .from('waitlist')
        .upsert(
          {
            email,
            completed_signup: false,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'email',
            ignoreDuplicates: false,
          }
        )
        .select();

      if (dbError) {
        console.error('Supabase error:', dbError);
        return NextResponse.json(
          { error: 'Failed to save email. Please try again.' },
          { status: 500 }
        );
      }
    }


    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'veomate_submission_count',
      value: (submissionCount + 1).toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,

    });

    return response;
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
