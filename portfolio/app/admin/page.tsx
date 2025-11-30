"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, FolderOpen, Lightbulb, Briefcase } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.user || !data.user.isAdmin) {
        router.push("/admin/login");
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyber-cyan"></div>
      </div>
    );
  }

  const sections = [
    {
      icon: FolderOpen,
      title: "Projects",
      description: "Manage your portfolio projects",
      href: "/admin/projects",
      color: "cyan",
    },
    {
      icon: Lightbulb,
      title: "Skills",
      description: "Update your skills and expertise",
      href: "/admin/skills",
      color: "purple",
    },
    {
      icon: Briefcase,
      title: "Experience",
      description: "Manage work experience",
      href: "/admin/experience",
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-6 h-6 text-cyber-cyan" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-foreground/70">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 glass glow-border rounded-lg hover:bg-cyber-cyan/10 transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">
            Welcome back, <span className="glow-text">Admin</span>
          </h2>
          <p className="text-foreground/70">Manage your portfolio content from here</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <a
              key={section.title}
              href={section.href}
              className="glass rounded-xl p-8 hover:border-cyber-cyan/50 transition-all group"
            >
              <div className={`p-4 bg-gradient-${section.color} rounded-lg inline-block mb-4`}>
                <section.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-cyber-cyan group-hover:text-cyber-purple transition-colors">
                {section.title}
              </h3>
              <p className="text-foreground/70">{section.description}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
