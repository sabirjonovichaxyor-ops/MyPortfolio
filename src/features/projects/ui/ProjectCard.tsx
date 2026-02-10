import { motion } from "framer-motion"
import { ExternalLink, Github, Globe, Eye } from "lucide-react"

interface Props {
  project: {
    title: string;
    description?: string;
    image: string;
    link?: string;
    github?: string;
    live?: string;
    tags?: string[];
    featured?: boolean;
  };
}

export function ProjectCard({ project }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
            Featured
          </span>
        </div>
      )}

      {/* Card container */}
      <div className="relative h-full rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20 transition-all duration-500">
        
        {/* Image container with gradient overlay */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Quick actions overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-transform duration-300 shadow-lg"
                aria-label="GitHub repository"
              >
                <Github className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </a>
            )}
            
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-transform duration-300 shadow-lg"
                aria-label="Live demo"
              >
                <Globe className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </a>
            )}
          </div>
        </div>

        {/* Content container */}
        <div className="p-6 space-y-4">
          {/* Title with gradient */}
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            {project.title}
          </h3>

          {/* Description */}
          {project.description && (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/30 dark:border-gray-800/30">
            <div className="flex items-center gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group/link"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                </a>
              )}
            </div>

            {/* View button */}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rotate-45" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-12 h-12 overflow-hidden">
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rotate-45" />
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
}