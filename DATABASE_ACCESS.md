# Database Access Guide

This guide shows you how to view and manage waitlist data in Supabase.

## Quick Access

**Your Supabase Project**: https://turarcxbrqccyhcszszv.supabase.co

---

## View Waitlist Data in Supabase Dashboard

### Method 1: Table Editor (Visual Interface)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `turarcxbrqccyhcszszv`
3. Click **Table Editor** in the left sidebar
4. Select the `waitlist` table
5. You'll see all submissions in a spreadsheet-like view

**What you can do:**

- View all entries
- Sort by column (click column headers)
- Filter data
- Edit entries manually
- Delete entries
- Export to CSV

### Method 2: SQL Editor (Advanced)

1. Go to your Supabase dashboard
2. Click **SQL Editor** in the left sidebar
3. Use queries to analyze your data

**Useful Queries:**

```sql
-- View all waitlist entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Count total signups
SELECT COUNT(*) as total_signups FROM waitlist;

-- Count completed vs incomplete signups
SELECT
  completed_signup,
  COUNT(*) as count
FROM waitlist
GROUP BY completed_signup;

-- View only completed signups
SELECT
  email,
  first_name,
  last_name,
  phone_number,
  company_name,
  created_at
FROM waitlist
WHERE completed_signup = true
ORDER BY created_at DESC;

-- View incomplete signups (just email)
SELECT
  email,
  created_at
FROM waitlist
WHERE completed_signup = false
ORDER BY created_at DESC;

-- Count by team size
SELECT
  team_size,
  COUNT(*) as count
FROM waitlist
WHERE team_size IS NOT NULL
GROUP BY team_size
ORDER BY count DESC;

-- Count by how they heard about us
SELECT
  hear_about,
  COUNT(*) as count
FROM waitlist
WHERE hear_about IS NOT NULL
GROUP BY hear_about
ORDER BY count DESC;

-- Recent signups (last 7 days)
SELECT
  email,
  first_name,
  last_name,
  created_at
FROM waitlist
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Export all data (copy results)
SELECT
  email,
  first_name,
  last_name,
  country_code || ' ' || phone_number as phone,
  company_name,
  role,
  team_size,
  hear_about,
  completed_signup,
  created_at
FROM waitlist
ORDER BY created_at DESC;
```

---

## Set Up Netlify Environment Variables

To use the real database in production on Netlify:

### Step 1: Add Environment Variables in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your VeoMate waitlist site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** and add:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://turarcxbrqccyhcszszv.supabase.co`
   - Scopes: Select all (Production, Deploy Previews, Branch Deploys)

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cmFyY3hicnFjY3loY3N6c3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNTIwNzAsImV4cCI6MjA3OTYyODA3MH0.cuCqP0AKkZdbRFptEYvE_NBbESOf9dc-KpnCv29FSrg`
   - Scopes: Select all

5. Click **Save**

### Step 2: Redeploy Your Site

After adding environment variables:

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for the deployment to finish
4. Your live site will now use the real Supabase database!

---

## API Access (Optional)

You can also access your data via the Supabase API:

### REST API

```bash
# Get all waitlist entries
curl https://turarcxbrqccyhcszszv.supabase.co/rest/v1/waitlist \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### JavaScript/TypeScript

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://turarcxbrqccyhcszszv.supabase.co',
  'YOUR_ANON_KEY'
);

// Get all entries
const { data, error } = await supabase
  .from('waitlist')
  .select('*')
  .order('created_at', { ascending: false });

console.log(data);
```

---

## Set Up Real-Time Updates (Optional)

Subscribe to changes in real-time:

```typescript
const subscription = supabase
  .channel('waitlist-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'waitlist',
    },
    (payload) => {
      console.log('New signup!', payload.new);
    }
  )
  .subscribe();
```

---

## Export Data

### Method 1: From Table Editor

1. Open Table Editor → `waitlist` table
2. Click **Export** button
3. Choose CSV format
4. Download file

### Method 2: From SQL Editor

1. Run a SELECT query
2. Click **Download** button in results
3. Choose format (CSV, JSON, etc.)

### Method 3: Using Supabase Studio

1. Install Supabase CLI: `npm install -g supabase`
2. Export table:
   ```bash
   supabase db dump --table waitlist > waitlist_backup.sql
   ```

---

## Monitor Database

### View Database Activity

1. Go to **Database** → **Logs** in Supabase dashboard
2. See all queries being executed
3. Monitor performance

### Set Up Alerts (Optional)

1. Go to **Database** → **Webhooks**
2. Create webhook for new signups
3. Send to Slack/Discord/Email when someone joins

---

## Security Best Practices

1. **Never commit** Supabase credentials to git (they're in .env.local which is gitignored)
2. **Row Level Security (RLS)** is enabled - public can only insert/update, not read all
3. **Anon key** is safe to expose in frontend (has limited permissions)
4. For admin access, use the **service_role key** (keep secret!)

---

## Troubleshooting

### Can't see data in Table Editor?

- Check RLS policies are set up correctly
- Try using SQL Editor with admin access
- Make sure table was created successfully

### Netlify site not saving to database?

- Verify environment variables are set in Netlify
- Check browser console for errors
- Ensure RLS policies allow public insert/update

### Want to access data from admin panel?

See the "Admin Access" policy in SUPABASE_SETUP.md to allow authenticated users to read all data.

---

## Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Your Project**: https://turarcxbrqccyhcszszv.supabase.co
- **API Docs**: https://supabase.com/docs/reference/javascript/introduction
- **Netlify Dashboard**: https://app.netlify.com
