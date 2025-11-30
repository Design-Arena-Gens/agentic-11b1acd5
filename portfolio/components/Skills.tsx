"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export default function Skills({ skills = [] }: { skills?: Skill[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Demo skills
  const demoSkills: Skill[] = [
    { _id: "1", name: "Next.js", category: "Frontend", level: 95 },
    { _id: "2", name: "React", category: "Frontend", level: 90 },
    { _id: "3", name: "TypeScript", category: "Frontend", level: 88 },
    { _id: "4", name: "TailwindCSS", category: "Frontend", level: 92 },
    { _id: "5", name: "Node.js", category: "Backend", level: 85 },
    { _id: "6", name: "MongoDB", category: "Backend", level: 80 },
    { _id: "7", name: "PostgreSQL", category: "Backend", level: 78 },
    { _id: "8", name: "Python", category: "Backend", level: 75 },
    { _id: "9", name: "AWS", category: "DevOps", level: 70 },
    { _id: "10", name: "Docker", category: "DevOps", level: 72 },
    { _id: "11", name: "OpenAI API", category: "AI/ML", level: 85 },
    { _id: "12", name: "LangChain", category: "AI/ML", level: 80 },
  ];

  const displaySkills = skills.length > 0 ? skills : demoSkills;

  const categories = Array.from(new Set(displaySkills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Technical <span className="glow-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-cyber mx-auto" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-cyber-cyan">{category}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {displaySkills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: catIndex * 0.1 + index * 0.05 }}
                      className="glass rounded-xl p-6"
                    >
                      <div className="flex justify-between mb-3">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-cyber-cyan">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: catIndex * 0.1 + index * 0.05 + 0.3 }}
                          className="h-full bg-gradient-cyber rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
