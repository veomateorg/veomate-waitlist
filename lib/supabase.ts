import { createClient } from '@supabase/supabase-js';

// Use placeholder values during build time if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (
  supabaseUrl === 'https://placeholder.supabase.co' ||
  supabaseAnonKey === 'placeholder-anon-key'
) {
  console.warn('Supabase credentials are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface WaitlistEntry {
  id?: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  country_code?: string | null;
  phone_number?: string | null;
  company_name?: string | null;
  role?: string | null;
  team_size?: string | null;
  hear_about?: string | null;
  completed_signup?: boolean;
  created_at?: string;
  updated_at?: string;
}
