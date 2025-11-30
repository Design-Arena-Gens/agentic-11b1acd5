"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Briefcase } from "lucide-react";

interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
}

export default function Experience({ experiences = [] }: { experiences?: Experience[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Demo experiences
  const demoExperiences: Experience[] = [
    {
      _id: "1",
      company: "Tech Innovations Inc.",
      position: "Senior Full-Stack Developer",
      description: "Led development of AI-powered SaaS platform, implementing microservices architecture and reducing load times by 40%. Mentored junior developers and conducted code reviews.",
      startDate: "2022-01-01",
      current: true,
      technologies: ["Next.js", "Node.js", "MongoDB", "AWS", "OpenAI"],
    },
    {
      _id: "2",
      company: "Digital Solutions Co.",
      position: "Full-Stack Developer",
      description: "Developed and maintained multiple client projects using modern web technologies. Implemented responsive designs and optimized database queries for better performance.",
      startDate: "2020-06-01",
      endDate: "2021-12-31",
      current: false,
      technologies: ["React", "Express", "PostgreSQL", "Docker"],
    },
    {
      _id: "3",
      company: "StartUp Ventures",
      position: "Frontend Developer",
      description: "Built dynamic user interfaces for various web applications. Collaborated with designers to implement pixel-perfect designs and ensure cross-browser compatibility.",
      startDate: "2019-01-01",
      endDate: "2020-05-31",
      current: false,
      technologies: ["React", "JavaScript", "CSS", "Redux"],
    },
  ];

  const displayExperiences = experiences.length > 0 ? experiences : demoExperiences;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Work <span className="glow-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-cyber" />

            <div className="space-y-12">
              {displayExperiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-cyber-cyan border-4 border-background" />

                  <div className="glass rounded-xl p-6 hover:border-cyber-cyan/50 transition-all">
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-cyber-cyan mb-1">
                          {exp.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-foreground/70">
                          <Briefcase size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-cyber-purple">
                        <Calendar size={16} />
                        <span>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.endDate!)}
                        </span>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
