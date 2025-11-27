# QUICK FIX - RLS Policy Error

## Error You're Seeing:
```
code: "42501"
message: "new row violates row-level security policy for table \"waitlist\""
```

## Fix Options (Choose One)

---

### ✅ OPTION 1: Disable RLS (Quick & Easy - Recommended for Testing)

**This is the fastest fix for a waitlist form.**

1. Go to: https://supabase.com/dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste this SQL:

```sql
-- Disable Row Level Security on waitlist table
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
```

5. Click **Run** (or press Cmd/Ctrl + Enter)
6. ✅ Done! Test your form now

**Note:** This makes the table accessible to anyone, which is fine for a waitlist. The anon key already limits what can be done.

---

### 🔒 OPTION 2: Enable RLS with Proper Policies (More Secure)

If you want to keep RLS enabled:

1. Go to: https://supabase.com/dashboard
2. Click **SQL Editor** → **New Query**
3. Paste this ENTIRE script:

```sql
-- First, check if policies exist and drop them
DROP POLICY IF EXISTS "Allow public insert" ON waitlist;
DROP POLICY IF EXISTS "Allow update by email" ON waitlist;
DROP POLICY IF EXISTS "Allow public read" ON waitlist;

-- Create policies that allow anonymous users to insert and update
CREATE POLICY "Allow public insert"
ON waitlist FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow update by email"
ON waitlist FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Optional: Allow reading data (for admin dashboards)
CREATE POLICY "Allow public read"
ON waitlist FOR SELECT
TO public
USING (true);

-- Ensure RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Verify the policies were created
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'waitlist';
```

4. Click **Run**
5. Check the results - you should see 3 policies listed
6. ✅ Test your form

---

## How to Verify the Fix Worked

After running either option:

1. Go to `http://localhost:3000` (make sure dev server is running)
2. Enter an email and click "Join Waitlist"
3. Check browser console (F12) - should see no errors
4. Go to Supabase → **Table Editor** → **waitlist**
5. You should see your entry! 🎉

---

## Still Not Working?

### Check if the table exists:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'waitlist';
```

If it returns nothing, you need to create the table first. Run the SQL from `SUPABASE_SETUP.md`.

### Check current RLS status:
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'waitlist';
```

- `rowsecurity = true` means RLS is enabled
- `rowsecurity = false` means RLS is disabled

### Check existing policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
```

---

## Why This Error Happened

Row Level Security (RLS) is a Supabase security feature that controls who can access data. By default, it blocks all access unless you create policies that explicitly allow it.

For a public waitlist form, you need to either:
- **Disable RLS** (simpler, still secure enough for waitlists)
- **Create policies** that allow anonymous users to insert/update

The anon key you're using already has limited permissions, so even with RLS disabled, users can only do what the key allows (insert/update to waitlist table).

---

## Recommendation

**For a waitlist:** Use Option 1 (Disable RLS)
- Simpler to manage
- Waitlist data isn't highly sensitive
- Still protected by API key permissions
- You can always enable RLS later if needed

**For user accounts/sensitive data:** Use Option 2 (Enable RLS with policies)
- More granular control
- Better for multi-tenant apps
- Required for apps with user authentication
