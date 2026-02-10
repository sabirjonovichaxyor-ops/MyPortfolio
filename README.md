# Portfolio Pro

A modern, full-stack portfolio website built with React, TypeScript, and Supabase.

## 🚀 Features

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Dark/Light mode** support
- **Responsive design** for all devices

### Backend
- **Supabase** for database and authentication
- **Real-time** data synchronization
- **Row Level Security** (RLS)
- **File storage** for images
- **Edge functions** for server-side logic

### Admin Panel
- **Dashboard** with analytics
- **Blog management** (CRUD operations)
- **Message management** system
- **Project management**
- **User management**
- **Real-time notifications**

## 📁 Project Structure

```
portfolio-pro/
├── src/
│   ├── app/                    # App configuration
│   │   ├── router.tsx         # React Router setup
│   │   └── providers.tsx       # App providers
│   ├── components/             # Reusable components
│   ├── entities/              # Data models and types
│   │   ├── blog/
│   │   ├── contact/
│   │   └── project/
│   ├── features/              # Feature modules
│   │   ├── admin/            # Admin panel
│   │   ├── blog/             # Blog functionality
│   │   └── contact/          # Contact form
│   ├── layouts/              # Layout components
│   │   ├── PublicLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── pages/                # Page components
│   ├── shared/               # Shared utilities
│   │   ├── api/              # API clients
│   │   ├── auth/             # Authentication
│   │   └── utils/            # Helper functions
│   └── ui/                   # UI components
├── supabase/                 # Database files
│   ├── migrations/           # Database migrations
│   └── seed.sql             # Seed data
├── docs/                    # Documentation
└── public/                  # Static assets
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 5.4.21** - Build tool
- **React Router 6.30.3** - Routing
- **React Query 5.90.20** - Data fetching
- **Tailwind CSS 3.4.19** - Styling
- **Framer Motion 12.31.0** - Animations

### Backend
- **Supabase** - Database and auth
- **PostgreSQL** - Database
- **Row Level Security** - Data protection

### Development Tools
- **ESLint 9.39.2** - Code linting
- **TypeScript ESLint** - TypeScript linting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.24** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/portfolio-pro.git
cd portfolio-pro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Set up the database
Follow the [Database Setup Guide](docs/database-setup.md) to create the necessary tables and functions in Supabase.

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) to view the application.

## 📊 Database Schema

The application uses the following main tables:

- **blog_posts** - Blog articles and content
- **contact_messages** - Contact form submissions
- **projects** - Portfolio projects
- **portfolio_views** - Analytics data

See [Database Setup Guide](docs/database-setup.md) for detailed schema information.

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Structure

The project follows a feature-based architecture:

- **Entities** - TypeScript interfaces and types
- **Features** - Self-contained feature modules
- **Shared** - Reusable utilities and components
- **UI** - Presentational components

### API Integration

The application uses React Query for data fetching:

```typescript
// Example hook
const { data, loading, error } = useQuery({
  queryKey: ['blog-posts'],
  queryFn: () => BlogApi.getPosts()
})
```

## 🎨 Styling

The project uses Tailwind CSS for styling with a custom configuration:

- **Responsive design** - Mobile-first approach
- **Dark mode** - Automatic theme switching
- **Component variants** - Using class-variance-authority
- **Custom animations** - Framer Motion integration

## 🔐 Authentication

Authentication is handled through Supabase Auth:

```typescript
// Example login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

## 📱 Admin Panel

The admin panel provides:

- **Dashboard** - Analytics and overview
- **Blog Management** - Create, edit, delete posts
- **Message Management** - Handle contact messages
- **Project Management** - Manage portfolio projects
- **User Management** - User administration

Access the admin panel at `/admin` (requires authentication).

## 🚀 Deployment

### Build the application
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables for Production
Make sure to set these in your hosting provider:

```env
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-supabase-anon-key
```

## 📈 Performance

The application is optimized for:

- **Fast loading** - Code splitting and lazy loading
- **SEO friendly** - Meta tags and structured data
- **Responsive images** - Optimized image loading
- **Caching** - React Query caching strategy

## 🧪 Testing

The project is set up for testing (testing framework to be added):

```bash
npm run test          # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you have any questions or need help:

1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/your-username/portfolio-pro/issues)
3. Create a new issue

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [Vercel](https://vercel.com) - Hosting platform
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

Built with ❤️ by [Your Name](https://your-website.com)
=======
# Personal Portfolio

This is my personal portfolio website.

Tech stack:
- React
- TailwindCSS
- GlobalCSS

