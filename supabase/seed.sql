-- Portfolio Pro - Seed Data
-- Development and testing data

-- Sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, status, tags, featured_image, meta_title, meta_description) VALUES
(
    'Building Modern Web Applications with React',
    'building-modern-web-applications-with-react',
    '# Building Modern Web Applications with React

React has revolutionized the way we build web applications. In this post, I''ll share my experience building scalable and maintainable applications using React and modern tools.

## Key Concepts

### Component-Based Architecture
React''s component-based architecture allows us to build reusable UI components that encapsulate their own logic and styling.

### State Management
Modern React applications often require sophisticated state management solutions...

### Performance Optimization
Learn how to optimize your React applications for better performance...',
    'Learn how to build scalable React applications with modern tools and best practices.',
    'PUBLISHED',
    ARRAY['React', 'JavaScript', 'Web Development', 'Frontend'],
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    'Building Modern Web Applications with React',
    'Complete guide to building scalable React applications with modern tools and best practices.'
),
(
    'TypeScript Best Practices in 2024',
    'typescript-best-practices-2024',
    '# TypeScript Best Practices in 2024

TypeScript has become the go-to language for building type-safe JavaScript applications. Here are the best practices I''ve learned...

## Type Safety

Always prefer explicit types over implicit ones. Use interfaces for object shapes and types for unions...

## Advanced Patterns
Learn about advanced TypeScript patterns...',
    'Discover the latest TypeScript best practices and patterns for building type-safe applications.',
    'PUBLISHED',
    ARRAY['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    'TypeScript Best Practices in 2024',
    'Latest TypeScript best practices and patterns for building type-safe applications.'
),
(
    'Coming Soon: Advanced CSS Techniques',
    'coming-soon-advanced-css-techniques',
    '# Advanced CSS Techniques

This post is currently being written. Stay tuned for amazing CSS techniques...',
    'Advanced CSS techniques for modern web development.',
    'DRAFT',
    ARRAY['CSS', 'Web Development', 'Frontend'],
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    'Advanced CSS Techniques',
    'Advanced CSS techniques for modern web development.'
)
ON CONFLICT (slug) DO NOTHING;

-- Sample projects
INSERT INTO projects (title, slug, description, technologies, featured_image, live_url, github_url, status, featured, sort_order) VALUES
(
    'E-Commerce Platform',
    'e-commerce-platform',
    'A full-featured e-commerce platform built with modern technologies. Includes user authentication, product catalog, shopping cart, payment processing, and admin dashboard.',
    ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker'],
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    'https://ecommerce-demo.example.com',
    'https://github.com/username/ecommerce-platform',
    'ACTIVE',
    TRUE,
    1
),
(
    'Task Management App',
    'task-management-app',
    'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    ARRAY['React', 'TypeScript', 'Socket.io', 'Express', 'PostgreSQL'],
    'https://images.unsplash.com/photo-1542744173-8e7a5d8eea4a?w=800',
    'https://tasks-demo.example.com',
    'https://github.com/username/task-management',
    'ACTIVE',
    TRUE,
    2
),
(
    'Weather Dashboard',
    'weather-dashboard',
    'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    ARRAY['React', 'Chart.js', 'OpenWeather API', 'Geolocation API'],
    'https://images.unsplash.com/photo-1592210454359-503f474b6c31?w=800',
    'https://weather-demo.example.com',
    'https://github.com/username/weather-dashboard',
    'ACTIVE',
    FALSE,
    3
),
(
    'Social Media Analytics',
    'social-media-analytics',
    'Analytics dashboard for social media metrics with data visualization, reporting, and insights generation.',
    ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Redis'],
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    'https://analytics-demo.example.com',
    'https://github.com/username/social-analytics',
    'INACTIVE',
    FALSE,
    4
)
ON CONFLICT (slug) DO NOTHING;

-- Sample contact messages
INSERT INTO contact_messages (name, email, subject, message, status) VALUES
(
    'John Doe',
    'john.doe@example.com',
    'Project Collaboration',
    'Hi! I''m really impressed with your portfolio. I''d like to discuss a potential collaboration on a new project. Would you be available for a call next week?',
    'NEW'
),
(
    'Jane Smith',
    'jane.smith@company.com',
    'Job Opportunity',
    'We have an opening for a Senior React Developer at our company. Your experience looks like a great fit. Would you be interested in learning more?',
    'READ'
),
(
    'Mike Johnson',
    'mike.johnson@startup.io',
    'Freelance Work',
    'We need help with our React application. Are you available for freelance work? The project involves building a new dashboard.',
    'RESPONDED'
),
(
    'Sarah Wilson',
    'sarah.wilson@design.com',
    'Portfolio Feedback',
    'Just wanted to say your portfolio looks amazing! The design and functionality are top-notch. Keep up the great work!',
    'READ'
),
(
    'Tom Brown',
    'tom.brown@techcorp.com',
    'Technical Question',
    'I saw your blog post about TypeScript and had a question about advanced type patterns. Would you be able to help clarify something?',
    'NEW'
);

-- Sample portfolio views (for analytics)
INSERT INTO portfolio_views (ip_address, user_agent, referrer, page_path, session_id) VALUES
('192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://google.com', '/', 'session_001'),
('192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'https://linkedin.com', '/blog', 'session_002'),
('192.168.1.102', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'https://twitter.com', '/projects', 'session_003'),
('192.168.1.103', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', 'https://github.com', '/contact', 'session_004'),
('192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://stackoverflow.com', '/', 'session_005'),
('192.168.1.105', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'https://reddit.com', '/blog/building-modern-web-applications-with-react', 'session_006'),
('192.168.1.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://facebook.com', '/projects/e-commerce-platform', 'session_007'),
('192.168.1.107', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'https://instagram.com', '/', 'session_008'),
('192.168.1.108', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', 'https://medium.com', '/about', 'session_009'),
('192.168.1.109', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://youtube.com', '/blog/typescript-best-practices-2024', 'session_010');

-- Add some more views for better analytics
INSERT INTO portfolio_views (ip_address, user_agent, page_path, session_id) VALUES
('192.168.1.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '/', 'session_011'),
('192.168.1.111', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '/', 'session_012'),
('192.168.1.112', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', '/', 'session_013'),
('192.168.1.113', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', '/', 'session_014'),
('192.168.1.114', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '/', 'session_015');
