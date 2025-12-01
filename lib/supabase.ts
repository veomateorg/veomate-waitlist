import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

