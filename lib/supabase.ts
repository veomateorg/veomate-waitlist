import { createClient } from '@supabase/supabase-js';

// Use placeholder values during build time if environment variables are not set
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Check if we're using placeholder credentials
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
  console.warn(
    '📝 To connect to a real database, follow the instructions in SUPABASE_SETUP.md'
  );
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

// LocalStorage fallback for demo mode (when Supabase is not configured)
const STORAGE_KEY = 'veomate_waitlist_demo';

export const saveToLocalStorage = (entry: Partial<WaitlistEntry>) => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const data: WaitlistEntry[] = existing ? JSON.parse(existing) : [];

    // Check if email already exists
    const existingIndex = data.findIndex((item) => item.email === entry.email);

    if (existingIndex >= 0) {
      // Update existing entry
      data[existingIndex] = {
        ...data[existingIndex],
        ...entry,
        updated_at: new Date().toISOString(),
      };
    } else {
      // Add new entry
      data.push({
        id: crypto.randomUUID(),
        email: entry.email || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...entry,
      } as WaitlistEntry);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('💾 Saved to localStorage (demo mode):', entry.email);
    return { success: true };
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return { success: false, error };
  }
};
