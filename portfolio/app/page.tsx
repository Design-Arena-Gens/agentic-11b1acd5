import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ExperienceSection from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import SkillModel from "@/models/Skill";
import ExperienceModel from "@/models/Experience";

async function getPortfolioData() {
  try {
    await connectDB();

    const [projects, skills, experiences] = await Promise.all([
      ProjectModel.find({ featured: true }).sort({ order: 1 }).limit(6).lean(),
      SkillModel.find().sort({ category: 1, order: 1 }).lean(),
      ExperienceModel.find().sort({ startDate: -1 }).lean(),
    ]);

    return {
      projects: JSON.parse(JSON.stringify(projects)),
      skills: JSON.parse(JSON.stringify(skills)),
      experiences: JSON.parse(JSON.stringify(experiences)),
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return { projects: [], skills: [], experiences: [] };
  }
}

export default async function Home() {
  const { projects, skills, experiences } = await getPortfolioData();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <ExperienceSection experiences={experiences} />
      <Contact />
      <Footer />
    </main>
  );
}
