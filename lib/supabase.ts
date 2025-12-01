import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isUsingPlaceholderCredentials = () => {
  return (
    supabaseUrl === 'https://placeholder.supabase.co' ||
    supabaseAnonKey === 'placeholder-anon-key' ||
    supabaseUrl === 'https://example.supabase.co'
  );
};

if (isUsingPlaceholderCredentials()) {
  console.warn(
    '⚠️ Supabase credentials are not configured. Running in DEMO MODE with localStorage fallback.'
  );
}

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

const STORAGE_KEY = 'veomate_waitlist_demo';

export const saveToLocalStorage = (entry: Partial<WaitlistEntry>) => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const data: WaitlistEntry[] = existing ? JSON.parse(existing) : [];

    const existingIndex = data.findIndex((item) => item.email === entry.email);

    if (existingIndex >= 0) {
      data[existingIndex] = {
        ...data[existingIndex],
        ...entry,
        updated_at: new Date().toISOString(),
      };
    } else {
      data.push({
        id: crypto.randomUUID(),
        email: entry.email || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...entry,
      } as WaitlistEntry);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return { success: false, error };
  }
};
