# Database Setup Guide

## Overview
Portfolio Pro uses Supabase as the backend database. This guide covers the complete database setup process.

## Prerequisites
- Supabase account and project
- Supabase CLI installed locally
- Environment variables configured

## Database Schema

### Tables

#### 1. `blog_posts`
Blog posts table for managing blog content.

```sql
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    status TEXT CHECK (status IN ('DRAFT', 'PUBLISHED')),
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. `contact_messages`
Contact form messages table.

```sql
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT CHECK (status IN ('NEW', 'READ', 'RESPONDED', 'SPAM')),
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. `projects`
Portfolio projects table.

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    technologies TEXT[] DEFAULT '{}',
    featured_image TEXT,
    live_url TEXT,
    github_url TEXT,
    status TEXT CHECK (status IN ('ACTIVE', 'INACTIVE', 'MAINTENANCE')),
    featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. `portfolio_views`
Analytics table for tracking page views.

```sql
CREATE TABLE portfolio_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_path TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Functions

#### `get_portfolio_analytics(period)`
Returns analytics data for the specified period.

```sql
CREATE OR REPLACE FUNCTION get_portfolio_analytics(period TEXT DEFAULT 'week')
RETURNS TABLE(
    total_visits BIGINT,
    unique_visitors BIGINT,
    new_messages BIGINT,
    published_posts BIGINT,
    active_projects BIGINT,
    trend DECIMAL
);
```

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended for Development)

1. **Go to Supabase Dashboard**
   - Navigate to your Supabase project
   - Go to the SQL Editor

2. **Run Migration Script**
   - Copy the contents of `supabase/migrations/20240101_create_initial_tables.sql`
   - Paste and run in the SQL Editor

3. **Run Seed Data (Optional)**
   - Copy the contents of `supabase/seed.sql`
   - Paste and run in the SQL Editor

### Option 2: Using Supabase CLI (Recommended for Production)

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```

3. **Link to your project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Apply migrations**
   ```bash
   supabase db push
   ```

5. **Seed data (optional)**
   ```bash
   supabase db reset
   ```

### Option 3: Manual Setup

1. **Create Tables Manually**
   - Use the SQL scripts provided in the migration file
   - Run each table creation separately

2. **Create Functions**
   - Create the `get_portfolio_analytics` function
   - Test the function with different periods

## Environment Variables

Make sure your `.env` file contains:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Testing the Setup

### 1. Test Database Connection
```javascript
import { supabase } from './lib/supabase'

// Test connection
const { data, error } = await supabase.from('blog_posts').select('count')
if (error) console.error('Database connection failed:', error)
else console.log('Database connected successfully')
```

### 2. Test Analytics Function
```javascript
// Test analytics function
const { data, error } = await supabase.rpc('get_portfolio_analytics', { period: 'week' })
if (error) console.error('Analytics function failed:', error)
else console.log('Analytics data:', data)
```

### 3. Test CRUD Operations
```javascript
// Test blog post creation
const { data, error } = await supabase.from('blog_posts').insert({
  title: 'Test Post',
  slug: 'test-post',
  content: 'This is a test post',
  status: 'DRAFT'
}).select().single()

if (error) console.error('Insert failed:', error)
else console.log('Post created:', data)
```

## Troubleshooting

### Common Issues

1. **404 Errors on API Calls**
   - Check if tables exist in Supabase
   - Verify table names match exactly
   - Check column names (snake_case vs camelCase)

2. **Permission Errors**
   - Check RLS (Row Level Security) policies
   - Verify API key permissions
   - Check table permissions for `anon` and `authenticated` roles

3. **Function Not Found**
   - Verify function exists in Supabase
   - Check function name spelling
   - Ensure function is in the correct schema

### Debug Steps

1. **Check Supabase Logs**
   - Go to Supabase Dashboard → Logs
   - Look for error messages

2. **Verify Table Structure**
   ```sql
   -- List all tables
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
   
   -- Describe table structure
   \d blog_posts
   ```

3. **Test Queries Directly**
   - Use Supabase SQL Editor
   - Test the same queries your app is making

## Production Considerations

1. **Enable RLS (Row Level Security)**
   - Create appropriate policies for each table
   - Test with different user roles

2. **Set Up Backups**
   - Enable automatic backups in Supabase
   - Test backup restoration

3. **Monitor Performance**
   - Set up monitoring for slow queries
   - Optimize indexes as needed

4. **Security**
   - Use service role keys for server-side operations
   - Implement proper authentication
   - Validate all inputs

## Migration Strategy

When updating the schema:

1. **Create new migration files**
   - Use timestamp naming convention
   - Include both UP and DOWN operations

2. **Test migrations**
   - Test on development environment first
   - Verify data integrity

3. **Deploy carefully**
   - Backup before applying
   - Monitor for issues

## Support

If you encounter issues:

1. Check Supabase documentation
2. Review the error logs
3. Test with the Supabase SQL Editor
4. Verify environment variables
5. Check network connectivity
