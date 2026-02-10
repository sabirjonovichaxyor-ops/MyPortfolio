-- Portfolio Pro - Initial Schema Migration
-- Created: 2024-01-01

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'READ', 'RESPONDED', 'SPAM')),
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    technologies TEXT[] DEFAULT '{}',
    featured_image TEXT,
    live_url TEXT,
    github_url TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'MAINTENANCE')),
    featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio views table (for analytics)
CREATE TABLE IF NOT EXISTS portfolio_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_path TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_portfolio_views_created_at ON portfolio_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_views_session_id ON portfolio_views(session_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Analytics function
CREATE OR REPLACE FUNCTION get_portfolio_analytics(period TEXT DEFAULT 'week')
RETURNS TABLE(
    total_visits BIGINT,
    unique_visitors BIGINT,
    new_messages BIGINT,
    published_posts BIGINT,
    active_projects BIGINT,
    trend DECIMAL
) AS $$
DECLARE
    start_date TIMESTAMP WITH TIME ZONE;
    end_date TIMESTAMP WITH TIME ZONE;
    previous_period_start TIMESTAMP WITH TIME ZONE;
    current_visits BIGINT;
    previous_visits BIGINT;
BEGIN
    -- Set date range based on period
    end_date := NOW();
    
    CASE period
        WHEN 'today' THEN
            start_date := DATE_TRUNC('day', NOW());
            previous_period_start := start_date - INTERVAL '1 day';
        WHEN 'week' THEN
            start_date := DATE_TRUNC('week', NOW());
            previous_period_start := start_date - INTERVAL '1 week';
        WHEN 'month' THEN
            start_date := DATE_TRUNC('month', NOW());
            previous_period_start := start_date - INTERVAL '1 month';
        WHEN 'year' THEN
            start_date := DATE_TRUNC('year', NOW());
            previous_period_start := start_date - INTERVAL '1 year';
        ELSE
            start_date := DATE_TRUNC('week', NOW());
            previous_period_start := start_date - INTERVAL '1 week';
    END CASE;
    
    -- Get current period visits
    SELECT COUNT(*) INTO current_visits
    FROM portfolio_views
    WHERE created_at >= start_date AND created_at < end_date;
    
    -- Get previous period visits for trend calculation
    SELECT COUNT(*) INTO previous_visits
    FROM portfolio_views
    WHERE created_at >= previous_period_start AND created_at < start_date;
    
    -- Return analytics data
    RETURN QUERY
    SELECT 
        COALESCE(current_visits, 0) as total_visits,
        COALESCE((SELECT COUNT(DISTINCT session_id) 
                  FROM portfolio_views 
                  WHERE created_at >= start_date AND created_at < end_date), 0) as unique_visitors,
        COALESCE((SELECT COUNT(*) 
                  FROM contact_messages 
                  WHERE status = 'NEW'), 0) as new_messages,
        COALESCE((SELECT COUNT(*) 
                  FROM blog_posts 
                  WHERE status = 'PUBLISHED'), 0) as published_posts,
        COALESCE((SELECT COUNT(*) 
                  FROM projects 
                  WHERE status = 'ACTIVE'), 0) as active_projects,
        CASE 
            WHEN previous_visits = 0 THEN 0
            ELSE ROUND(((current_visits - previous_visits)::DECIMAL / previous_visits) * 100, 2)
        END as trend;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data (optional - for development)
INSERT INTO blog_posts (title, slug, content, excerpt, status, tags) VALUES
    ('Welcome to My Portfolio', 'welcome-to-my-portfolio', 
     'This is my first blog post...', 'An introduction to my portfolio', 
     'PUBLISHED', ARRAY['portfolio', 'introduction']),
    ('My Development Journey', 'my-development-journey',
     'Here''s my story...', 'How I became a developer',
     'PUBLISHED', ARRAY['career', 'development'])
ON CONFLICT (slug) DO NOTHING;

INSERT INTO projects (title, slug, description, technologies, status, featured) VALUES
    ('Portfolio Website', 'portfolio-website',
     'My personal portfolio website built with React', 
     ARRAY['React', 'TypeScript', 'Tailwind CSS'], 'ACTIVE', TRUE),
    ('E-commerce Platform', 'e-commerce-platform',
     'Full-stack e-commerce solution', 
     ARRAY['Node.js', 'MongoDB', 'React'], 'ACTIVE', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- Grant permissions (adjust as needed)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon;
