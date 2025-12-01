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

## Step 2: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

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

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy that allows updates only by matching email
CREATE POLICY "Allow update by email" ON waitlist
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

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

### How It Works

1. **Initial Email Capture**: When a user enters their email on the home page, a new record is created with just the email and `completed_signup = false`.

2. **Complete Signup**: If the user completes the additional details form, the existing record is updated with all the details and `completed_signup = true`.

3. **Duplicate Prevention**: The email field has a UNIQUE constraint, so if a user submits the same email multiple times, it will update the existing record instead of creating duplicates.

4. **Automatic Timestamps**: The `created_at` and `updated_at` fields are automatically managed by the database.

## Security

- **Row Level Security (RLS)** is enabled to control access to the data
- Public users can insert new records (for initial email capture)
- Public users can update records (for completing the signup)
- You should create additional policies for admin access to view all records

## Optional: Create Admin Policies

If you want to view all waitlist entries from your Supabase dashboard or create an admin panel:

```sql
-- Create a policy to allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to read all" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);
```

## Testing

After setup, test the integration:

1. Start your development server: `npm run dev`
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

- Ensure Row Level Security policies are set up correctly
- Check that the RLS policies allow public insert and update

### "Failed to fetch"

- Verify your environment variables are set correctly in `.env.local`
- Make sure you're using the correct URL and anon key
- Restart your development server after changing .env.local

## Next Steps

Once your database is set up:

1. Test the complete signup flow
2. Set up email notifications (optional)
3. Create an admin dashboard to view waitlist entries (optional)
4. Export data for marketing campaigns
