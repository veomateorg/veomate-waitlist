# Supabase Database Setup Guide

This guide will help you set up your Supabase database for the VeoMate waitlist.

## 🎮 Demo Mode

**The application currently runs in DEMO MODE** using localStorage as a fallback. This allows you to test the complete waitlist flow without setting up Supabase first.

### How Demo Mode Works:

- All form submissions are saved to browser localStorage
- Data persists in your browser (not shared across devices/browsers)
- Perfect for testing the UI and flow
- Check browser console to see demo mode messages
- View saved data in browser DevTools → Application → Local Storage → `veomate_waitlist_demo`

### To Enable Real Database:

Follow the setup steps below to connect to Supabase and switch from demo mode to a real database.

---

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in the sidebar
3. Navigate to **API** section
4. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
   - **service_role secret** key (under "Project API keys") - **Keep this secret!**

## Step 2: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Note:** The `SUPABASE_SERVICE_ROLE_KEY` allows the server to bypass Row Level Security (RLS) policies, ensuring secure updates without exposing permissions to the public.

## Step 3: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the following SQL:

```sql
-- Create the waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  country_code TEXT,
  phone_number TEXT,
  company_name TEXT,
  role TEXT,
  team_size TEXT,
  hear_about TEXT,
  completed_signup BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** to execute the SQL

**Important:** Since we are using the `service_role` key on the server, we do **NOT** need to create any public RLS policies (like "Allow public insert"). This keeps your database secure by default. Only your server (with the secret key) can read/write to this table.

## Step 4: Verify the Table

1. Go to **Table Editor** in your Supabase dashboard
2. You should see a new table called `waitlist`
3. Check that all columns are present:
   - id (uuid)
   - email (text)
   - first_name (text)
   - last_name (text)
   - country_code (text)
   - phone_number (text)
   - company_name (text)
   - role (text)
   - team_size (text)
   - hear_about (text)
   - completed_signup (boolean)
   - created_at (timestamp)
   - updated_at (timestamp)

## Database Schema Explanation

### Fields

| Field              | Type      | Required             | Description                          |
| ------------------ | --------- | -------------------- | ------------------------------------ |
| `id`               | UUID      | Yes (auto)           | Primary key, automatically generated |
| `email`            | TEXT      | Yes                  | User's email address (unique)        |
| `first_name`       | TEXT      | No                   | User's first name                    |
| `last_name`        | TEXT      | No                   | User's last name                     |
| `country_code`     | TEXT      | No                   | Phone country code (e.g., +1, +91)   |
| `phone_number`     | TEXT      | No                   | User's phone number                  |
| `company_name`     | TEXT      | No                   | User's company name                  |
| `role`             | TEXT      | No                   | User's job role/title                |
| `team_size`        | TEXT      | No                   | Size of user's team                  |
| `hear_about`       | TEXT      | No                   | How they heard about VeoMate         |
| `completed_signup` | BOOLEAN   | Yes (default: false) | Whether user completed full signup   |
| `created_at`       | TIMESTAMP | Yes (auto)           | When the record was created          |
| `updated_at`       | TIMESTAMP | Yes (auto)           | When the record was last updated     |

## Testing

After setup, test the integration:

1. Restart your development server: `npm run dev` (to load new env vars)
2. Visit `http://localhost:3000`
3. Submit an email
4. Check your Supabase dashboard **Table Editor** to see the new entry
5. Complete the signup form
6. Verify the record was updated with all the details

## Troubleshooting

### "relation 'waitlist' does not exist"

- Make sure you ran the SQL query to create the table
- Check that you're connected to the correct Supabase project

### "permission denied for table waitlist"

- Ensure you have added the `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` file.
- If you are using only the `ANON_KEY`, you will need to add RLS policies (not recommended for this setup).

### "Failed to fetch"

- Verify your environment variables are set correctly in `.env.local`
- Make sure you're using the correct URL and keys
- Restart your development server after changing .env.local
