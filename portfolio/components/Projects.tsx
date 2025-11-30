"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects({ projects = [] }: { projects?: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Demo projects for initial render
  const demoProjects: Project[] = [
    {
      _id: "1",
      title: "AI Chat Platform",
      description: "Real-time chat application with AI-powered responses and natural language processing",
      technologies: ["Next.js", "OpenAI", "WebSocket", "MongoDB"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      _id: "2",
      title: "E-Commerce Dashboard",
      description: "Modern admin dashboard with analytics, inventory management, and real-time updates",
      technologies: ["React", "TypeScript", "TailwindCSS", "Node.js"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      _id: "3",
      title: "Task Management System",
      description: "Collaborative task management with team features, deadlines, and progress tracking",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
      imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const displayProjects = projects.length > 0 ? projects : demoProjects;

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Featured <span className="glow-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden group hover:border-cyber-cyan/50 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-cyber-cyan">
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyber-cyan hover:text-cyber-purple transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyber-cyan hover:text-cyber-purple transition-colors"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
