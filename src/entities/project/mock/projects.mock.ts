import type { Project } from '@/entities/project';
import { ProjectStatus } from '@/entities/project';

export const PROJECTS_MOCK: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with modern UI, payment integration, and admin dashboard',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742044-7a7c369f6c9e?w-800',
      'https://images.unsplash.com/photo-1556742044-6a4a7c8f6b9a?w=800'
    ],
    status: ProjectStatus.PUBLISHED,
    tags: ['E-commerce', 'Full Stack', 'Responsive'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    featured: true,
    order: 1,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    liveUrl: 'https://demo-ecommerce.com',
    githubUrl: 'https://github.com/username/ecommerce',
    client: 'TechCorp Inc.',
    duration: '3 months',
    role: 'Full Stack Developer',
    content: 'This project involved building a complete e-commerce platform from scratch. I was responsible for designing the database schema, implementing the backend API with Node.js and MongoDB, and creating a responsive frontend using React and Tailwind CSS. The platform features user authentication, product management, shopping cart functionality, and payment processing through Stripe. I also developed an admin dashboard for managing orders and inventory. The project was successfully launched and is currently live at https://demo-ecommerce.com.'
  },
  {
    id: '2',
    title: 'Task Management Dashboard',
    description: 'Advanced task management system with real-time collaboration, drag-drop, and analytics',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    ],
    status: ProjectStatus.PUBLISHED,
    tags: ['Productivity', 'Real-time', 'Analytics'],
    technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma'],
    featured: true,
    order: 2,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-20',
    liveUrl: 'https://taskflow.app',
    githubUrl: 'https://github.com/username/taskflow',
    client: 'StartupXYZ',
    duration: '2 months',
    role: 'Frontend Lead',
    content: 'TaskFlow is a real-time task management dashboard designed to enhance team productivity. I led the frontend development using Next.js and TypeScript, implementing features such as drag-and-drop task organization, real-time updates with Socket.io, and interactive data visualizations for analytics. The backend was built with Node.js and PostgreSQL, utilizing Prisma for database management. The project was completed within a tight deadline and has received positive feedback from users for its intuitive design and robust functionality.'
  },
  {
    id: '3',
    title: 'Health & Fitness Mobile App',
    description: 'Mobile application for workout tracking, nutrition planning, and progress monitoring',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019614245-c6e8b48c1e3c?w=800',
      'https://images.unsplash.com/photo-1571019613455-1cb2f99b2d8c?w=800'
    ],
    status: ProjectStatus.PUBLISHED,
    tags: ['Mobile', 'Health', 'Tracking'],
    technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    featured: true,
    order: 3,
    createdAt: '2023-11-15',
    updatedAt: '2023-12-10',
    liveUrl: 'https://apps.apple.com/app/fit-tracker',
    githubUrl: 'https://github.com/username/fitness-app',
    client: 'HealthTech Startup',
    duration: '4 months',
    role: 'Mobile Developer',
    content: 'FitTracker is a comprehensive health and fitness mobile app that allows users to track their workouts, plan their nutrition, and monitor their progress. I was responsible for developing the app using React Native, integrating Firebase for backend services, and implementing state management with Redux. The app features personalized workout plans, a nutrition database, and interactive charts for tracking progress. It has been well-received by users for its user-friendly interface and valuable features.'
  },
  {
    id: '5',
    title: 'Real Estate Platform',
    description: 'Property listing platform with virtual tours, mortgage calculator, and agent matching',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffb?w=800',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffc?w=800'
    ],
    status: ProjectStatus.PUBLISHED,
    tags: ['Real Estate', 'Virtual Tour', 'Fintech'],
    technologies: ['Vue.js', 'Nuxt.js', 'Node.js', 'MySQL', 'Three.js'],
    featured: true,
    order: 4,
    createdAt: '2023-09-10',
    updatedAt: '2023-10-30',
    liveUrl: 'https://realtyview.com',
    githubUrl: 'https://github.com/username/real-estate-platform',
    client: 'RealEstate Corp',
    duration: '5 months',
    role: 'Full Stack Developer',
    content: 'RealtyView is a real estate platform that offers property listings with virtual tours, a mortgage calculator, and agent matching services. I developed the frontend using Vue.js and Nuxt.js, while the backend was built with Node.js and MySQL. The platform features 3D virtual tours implemented with Three.js, as well as a mortgage calculator that provides users with financial insights. The project was successfully launched and has attracted a significant user base within the first few months.'
  },
  {
    id: '8',
    title: 'Social Media Analytics',
    description: 'Comprehensive social media analytics dashboard with sentiment analysis and reporting',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f72?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f73?w=800'
    ],
    status: ProjectStatus.PUBLISHED,
    tags: ['Analytics', 'Social Media', 'Data Visualization'],
    technologies: ['React', 'D3.js', 'Python', 'Twitter API', 'PostgreSQL'],
    featured: true,
    order: 5,
    createdAt: '2023-12-01',
    updatedAt: '2023-12-28',
    liveUrl: 'https://socialinsights.com',
    githubUrl: 'https://github.com/username/social-analytics',
    client: 'Marketing Agency',
    duration: '2.5 months',
    role: 'Data Engineer',
    content: 'SocialInsights is a social media analytics dashboard that provides comprehensive insights into social media performance, including sentiment analysis and reporting. I was responsible for developing the frontend using React and D3.js for data visualization, while the backend was built with Python and PostgreSQL. The platform integrates with the Twitter API to fetch real-time data and provides users with actionable insights through interactive dashboards. The project has been praised for its depth of analysis and user-friendly design.'
  },
  {
    id: '11',
    title: 'AR Furniture App',
    description: 'Augmented Reality app for visualizing furniture in your space before purchase',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f7?w=800',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f8?w=800'
    ],
    status: ProjectStatus.PUBLISHED,
    tags: ['AR', '3D', 'Retail'],
    technologies: ['Unity', 'ARKit', 'ARCore', 'React Native', 'Three.js'],
    featured: true,
    order: 6,
    createdAt: '2023-10-10',
    updatedAt: '2023-11-25',
    liveUrl: 'https://apps.apple.com/app/ar-furniture',
    githubUrl: 'https://github.com/username/ar-furniture',
    client: 'Furniture Retailer',
    duration: '4 months',
    role: 'AR Developer',
    content: 'AR Furniture is an augmented reality app that allows users to visualize furniture in their space before making a purchase. I developed the app using Unity and integrated ARKit and ARCore for cross-platform AR functionality. The frontend was built with React Native, and I utilized Three.js for rendering 3D models. The app features a catalog of furniture items, real-time AR visualization, and the ability to save and share room designs. The project has been well-received for its innovative approach to online furniture shopping.'
  }
];
