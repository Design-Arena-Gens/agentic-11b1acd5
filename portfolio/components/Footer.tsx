"use client";

import { Github, Linkedin, Mail, Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Zap className="w-6 h-6 text-cyber-cyan" />
            <span className="text-xl font-bold glow-text">AI.DEV</span>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-cyber-cyan transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-cyber-cyan transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-foreground/60 hover:text-cyber-cyan transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <p className="text-foreground/60 text-sm">
            © {currentYear} AI.DEV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
