import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder for createPageUrl if it's not defined elsewhere
const createPageUrl = (pageName) => {
  switch (pageName) {
    case "Contact":
      return "/contact";
    default:
      return "/";
  }
};

// 🔥 Your 3 projects
const projects = [
  {
    id: 1,
    title: "Atomic Theory",
    category: "Logo Design",
    description: "Visual identity and brand system for Atomic Theory.",
    image: "/atomic-theory-vi-cover-page.jpg",
    tags: ["Brand Identity", "Logo Design", "Visual Identity"],
    year: "2024",
    featured: true,
    link: "https://www.behance.net/gallery/233116559/Visual-Identity-Atomic-Theory-"
  },
  {
    id: 2,
    title: "Xentrix Capital",
    category: "Logo Design",
    description: "Financial brand identity and logo system for Xentrix Capital.",
    image: "/xc-coverpage.jpg",
    tags: ["Logo Design", "Brand Identity"],
    year: "2024",
    link: "https://www.behance.net/gallery/226934901/Xentrix-Capital"
  },
  {
    id: 3,
    title: "Shifin Ahammed (Visual Identity)",
    category: "Logo Design",
    description: "Personal visual identity design for Shifin Ahammed.",
    image: "/thumbnail.jpg",
    tags: ["Personal Brand", "Logo Design", "Visual Identity"],
    year: "2024",
    link: "https://www.behance.net/gallery/221368697/Shifin-Ahammed"
  }
];

// All filters still exist
const categories = ["All", "Logo Design", "Branding", "UI/UX", "Video Editing", "Digital Marketing"];

// Card component with Behance link support
const ProjectCard = ({ project, large }) => (
  <motion.a
    href={project.link || "#"}
    target={project.link ? "_blank" : "_self"}
    rel="noopener noreferrer"
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    whileHover={{ y: -8 }}
    className={`glass rounded-[var(--radius-2)] overflow-hidden group cursor-pointer block ${
      large ? "w-full" : ""
    }`}
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover Glassmorphic Button - bottom left */}
      {project.link && (
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <Eye className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">View on Behance</span>
          </div>
        </div>
      )}
    </div>

    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[var(--color-primary)] font-semibold tracking-wide uppercase">
          {project.category}
        </span>
        <span className="text-sm text-[var(--color-text-tertiary)]">{project.year}</span>
      </div>

      <h3
        className="font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
        style={{ fontSize: "var(--type-h3)" }}
      >
        {project.title}
      </h3>

      <p className="text-base text-[var(--color-text-secondary)] mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-white/[0.05] text-[var(--color-text-tertiary)] px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.a>
);

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else if (activeCategory === "Logo Design" || activeCategory === "Branding") {
      // Both categories show all 3 projects
      setFilteredProjects(projects);
    } else {
      // Empty categories
      setFilteredProjects([]);
    }
  }, [activeCategory]);

  return (
    <div className="px-6 sm:px-12 md:px-16 py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.2, 0.9, 0.2, 1] }}
      >
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1
            className="font-bold mb-6 tracking-tighter"
            style={{ fontSize: "var(--type-h1)" }}
          >
            My <span className="gradient-text italic font-normal">Projects</span>
          </h1>
          <p
            className="max-w-3xl mx-auto mb-8"
            style={{ fontSize: "var(--type-body)" }}
          >
            A curated collection of work that represents my passion for creating
            meaningful, user-centered design solutions that make a lasting
            impact.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all border text-sm ${
                activeCategory === category
                  ? "bg-[var(--color-primary)] text-white border-transparent"
                  : "glass glass-hover text-[var(--color-text-secondary)] border-transparent"
              }`}
              style={{ transitionDuration: "var(--motion-micro)" }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <div className="space-y-8">
              {/* First Project large */}
              <ProjectCard project={filteredProjects[0]} large />

              {/* Rest 2 per row */}
              {filteredProjects.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {filteredProjects.slice(1).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-[var(--radius-2)] p-10 text-center"
            >
              <p className="text-lg text-[var(--color-text-secondary)]">
                🚧 Currently working on projects in this category. Stay tuned!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        className="glass rounded-3xl lg:rounded-[32px] p-8 lg:p-16 text-center mt-16 lg:mt-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.02] to-red-500/[0.02]" />
        <h2 className="relative text-3xl lg:text-4xl font-semibold mb-4 lg:mb-6 tracking-tight">
          Ready to create something amazing?
        </h2>
        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] mb-8 lg:mb-10 max-w-xl lg:max-w-2xl mx-auto font-light leading-relaxed">
          I'm always excited to work on new projects and bring fresh ideas to
          life. Let's collaborate and create something extraordinary together.
        </p>
        <Link
          to={createPageUrl("Contact")}
          className="inline-flex items-center gap-3 lg:gap-4 bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-orange-dark)] hover:from-[var(--accent-orange-dark)] hover:to-[var(--accent-orange)] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-orange-light)] hover:scale-105 transform text-lg"
        >
          Start a Project
          <ArrowRight className="w-6 h-6" />
        </Link>
      </motion.div>
    </div>
  );
}
