-- Fix Row Level Security Policies for Waitlist Table
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow public insert" ON waitlist;
DROP POLICY IF EXISTS "Allow update by email" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated users to read all" ON waitlist;

-- Step 2: Create the correct policies

-- Allow anyone (anonymous users) to insert new entries
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to update existing entries (by email)
CREATE POLICY "Allow update by email" ON waitlist
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Optional: Allow authenticated users to read all data (for admin access)
CREATE POLICY "Allow authenticated users to read all" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 3: Verify RLS is enabled (should already be)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Step 4: Verify policies are created
-- Run this to see all policies:
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'waitlist';
