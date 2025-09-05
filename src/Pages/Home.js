import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Palette, Code, Video, Layers, DownloadCloud } from "lucide-react";
import { Link } from "react-router-dom";

const createPageUrl = (pageName) => {
  switch (pageName) {
    case "Projects":
      return "/projects";
    default:
      return "/";
  }
};

const skills = [
  { title: "Logo Design", description: "I design logos that actually stick in people’s heads (in a good way)", icon: Sparkles, gradient: "from-orange-500 via-red-500 to-red-600", projects: "10+ Projects", featured: true },
  { title: "Branding", description: "Full visual systems that stay consistent across every platform", icon: Palette, gradient: "from-amber-500 via-orange-500 to-red-500", projects: "10+ Brands" },
  { title: "UI/UX Design", description: "Interfaces that feel smooth, intuitive, and human", icon: Code, gradient: "from-red-500 via-rose-500 to-pink-600", projects: "5+ Apps", featured: true },
  { title: "Video Editing", description: "Cinematic storytelling through motion and sound", icon: Video, gradient: "from-yellow-500 via-orange-500 to-red-500", projects: "30+ Videos" },
  { title: "Digital Marketing", description: "Strategies + campaigns that get your work seen, not lost in the feed.", icon: Layers, gradient: "from-rose-500 via-red-600 to-red-800", projects: "on progress" }
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, duration: 0.01 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.36, ease: [0.2, 0.9, 0.2, 1] } } };

const roles = [
  "Product Designer",
  "UI/UX Designer",
  "Brand Designer",
  "Video Editor",
  "Digital Marketer",
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = 80;
    const deletingSpeed = 35;
    const holdAtFull = 900;
    const holdAtEmpty = 250;

    let timeout;

    if (!isDeleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), holdAtFull);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }, holdAtEmpty);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  // Kick-start typing
  useEffect(() => {
    if (text === "" && !isDeleting) {
      const kick = setTimeout(() => setText(roles[roleIndex].slice(0, 1)), 10);
      return () => clearTimeout(kick);
    }
  }, [text, isDeleting, roleIndex]);

  const handleDoubleClick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  const scrollToWhatID = () => {
    const el = document.getElementById("what-i-do");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 px-6 sm:px-12 md:px-16 py-20 lg:py-24">
        
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mb-24 lg:mb-32">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start gap-10 lg:gap-14 max-w-6xl">
            
            {/* Left column */}
            <div className="max-w-3xl flex flex-col">
              <h1
                className="font-bold tracking-tighter mb-3 text-[var(--color-text-primary)] leading-snug sm:leading-tight"
                style={{ fontSize: "clamp(1.9rem, 5vw, 3.5rem)" }}
              >
                Hey there
                <br />
                <span
                  className="italic text-[var(--color-primary)]"
                  style={{ fontFamily: "var(--font-serif), 'Instrument Serif', serif" }}
                >
                  I'm Shifin Ahammed
                </span>
              </h1>

              {/* Typing role */}
              <div
                className="mb-5 flex items-center text-[var(--color-text-secondary)]"
                style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", minHeight: "2rem" }}
                aria-live="polite"
              >
                <span className="sr-only">Current role: {roles[roleIndex]}</span>
                <span className="italic">{text}</span>
                <span className="ml-1 inline-block w-[1px] h-[1.2em] bg-current animate-pulse" aria-hidden="true" />
              </div>

              {/* MOBILE profile image */}
              <motion.div
                variants={itemVariants}
                className="lg:hidden mb-6 relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onDoubleClick={handleDoubleClick}
              >
                <div className="aspect-square glass rounded-[var(--radius-2)] overflow-hidden mx-auto">
                  <img src="/pfp 101.jpg" alt="Shifin Ahammed" className="w-full h-full object-cover" loading="eager" />
                </div>
                {hovered && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-pulse whitespace-nowrap">
                    I dare you to double click me 👀
                  </div>
                )}
              </motion.div>

              {/* Description – hidden on mobile */}
              <motion.p
                variants={itemVariants}
                className="mb-6 max-w-2xl text-[var(--color-text-secondary)] hidden lg:block"
                style={{ fontSize: "var(--type-body)", lineHeight: "1.7" }}
              >
                By title, I'm a product designer, but I see the bigger picture. It’s not enough to design something beautiful; you have to connect it to an audience. I blend visual identity with digital marketing strategy to build brands that don't just look good—they perform.
              </motion.p>

              {/* CTA */}
              <motion.div variants={itemVariants} className="flex items-stretch gap-4 mb-4">
                <Link to={createPageUrl("Projects")} className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white px-4 py-3 rounded-[var(--radius-1)] font-semibold transition-transform duration-200 hover:scale-105 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none">
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="/CV-Shifin_Ahammed.pdf" download="CV-Shifin_Ahammed.pdf" className="group inline-flex items-center justify-center gap-2 glass glass-hover text-[var(--color-text-primary)] px-4 py-3 rounded-[var(--radius-1)] font-semibold transition-transform duration-200 hover:scale-105 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none">
                  <span>Download CV</span>
                  <DownloadCloud className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-primary)] transition-colors" />
                </a>
              </motion.div>

              {/* Mobile-only scroll arrow */}
              <div className="flex justify-center lg:hidden">
                <button onClick={scrollToWhatID} className="text-[var(--color-text-tertiary)] p-2 rounded-full hover:bg-white/5 transition" aria-label="Scroll to What I Do">
                  <motion.div initial={{ y: 0 }} animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Desktop profile image */}
            <motion.div
              variants={itemVariants}
              className="justify-self-center lg:justify-self-end hidden lg:block relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onDoubleClick={handleDoubleClick}
            >
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-[22px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/10 bg-white/5 cursor-pointer">
                <img src="/pfp 101.jpg" alt="Portrait of Shifin Ahammed" className="w-full h-full object-cover" />
              </div>
              {hovered && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-pulse whitespace-nowrap">
                  I dare you to double click me 👀
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* What I Do Section */}
        <motion.section id="what-i-do" variants={itemVariants} className="mb-24 lg:mb-32">
          <div className="mb-12">
            <motion.h2 variants={itemVariants} className="font-bold mb-4 tracking-tighter" style={{ fontSize: 'var(--type-h2)' }}>What I Do</motion.h2>
            <motion.p variants={itemVariants} className="max-w-2xl" style={{ fontSize: 'var(--type-body)' }}>
              My process is end-to-end. I handle everything from the core brand identity and UI/UX design to the digital marketing strategies needed to get that design in front of the right people. Think of me as a creative partner who obsesses over both the pixels and the performance.
            </motion.p>
          </div>

          <motion.div variants={containerVariants} className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 w-max">
              {skills.map((skill) => (
                <motion.div key={skill.title} variants={itemVariants} className="glass w-80 rounded-[var(--radius-2)] p-6 cursor-pointer relative overflow-hidden flex-shrink-0">
                  <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.2, ease: "easeOut" }} className="h-full w-full rounded-[var(--radius-2)] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-200`} />
                    <div className="relative w-16 h-16 rounded-[var(--radius-1)] flex items-center justify-center mb-6 shadow-lg bg-white/5 transition-transform">
                      <skill.icon className="w-8 h-8 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="font-semibold mb-3 tracking-tight text-[var(--color-text-primary)]">{skill.title}</h3>
                    <p className="mb-6 text-base">{skill.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--color-text-tertiary)] font-medium tracking-wide uppercase">{skill.projects}</span>
                      <ArrowRight className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all"/>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center mt-4 lg:hidden">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
              <ArrowRight className="w-4 h-4" />
              <span>Scroll to explore</span>
            </div>
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section variants={itemVariants}>
          <div className="glass rounded-[var(--radius-3)] p-8 lg:p-12 text-center relative overflow-hidden">
            <blockquote className="relative italic mb-6 leading-relaxed" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontFamily: 'var(--font-serif)' }}>
              "Good design is obvious.
              <span className="gradient-text block mt-2 font-medium">Great design is transparent."</span>
            </blockquote>
            <p className="text-[var(--color-text-tertiary)] text-base">— A principle that guides my work, inspired by Joe Sparano</p>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}




