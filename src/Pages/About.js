import React from "react";
import { motion } from "framer-motion";
import { Award, Coffee, Lightbulb, Heart, Users, Clock, Target, Zap } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "1+", icon: Award },
  { label: "Happy Clients", value: "10+", icon: Heart },
  { label: "Projects Shipped", value: "15+", icon: Lightbulb },
  { label: "Liters of Coffee", value: "∞", icon: Coffee },
];

const principles = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "Every design decision serves a clear purpose and user need"
  },
  {
    icon: Users,
    title: "Human-Centered",
    description: "Understanding real human behaviors drives all creative choices"
  },
  {
    icon: Zap,
    title: "Iterative Excellence",
    description: "Continuous refinement through testing and user feedback"
  },
  {
    icon: Clock,
    title: "Timeless Appeal",
    description: "Creating designs that remain relevant and beautiful over time"
  }
];

export default function About() {
  const [coffeeCount, setCoffeeCount] = React.useState("∞");

  return (
    <div className="px-6 sm:px-12 md:px-16 py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.2, 0.9, 0.2, 1] }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h1 className="font-bold tracking-tighter" style={{ fontSize: 'var(--type-h1)' }}>
            A Bit <span className="gradient-text italic font-normal">About Me</span>
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start mb-14">
          {/* Image with Easter Egg Tooltip */}
          <div className="lg:col-span-1 relative group">
            <div className="aspect-square glass rounded-[var(--radius-2)] overflow-hidden">
              <img
                src="/pfp 101.jpg"
                alt="Shifin Ahammed"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Easter Egg Tooltip */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              This is my “I didn’t sleep but still showed up” face 😅
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6" style={{ fontSize: 'var(--type-body)' }}>
              <p>
                My journey here wasn't exactly linear. I started out on a traditional engineering path, but I quickly realized I was more fascinated by *why* and *how* people use technology than by the code itself. Seeing the level of passion others had for pure engineering was a wake-up call—it showed me mine was elsewhere.
              </p>
              <p>
                So, I made the hard pivot. I dropped the formal degree and went all-in on the craft of design and branding. This hunger to build something of my own, driven by a need for both creative and financial independence, is what fuels me. It’s about chasing mastery on my own terms.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section with Coffee Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;

              if (stat.label === "Liters of Coffee") {
                return (
                  <div
                    key={stat.label}
                    onClick={() => {
                      if (coffeeCount === "∞") setCoffeeCount(1);
                      else setCoffeeCount((prev) => prev + 1);
                    }}
                    className="glass rounded-[var(--radius-2)] p-6 sm:p-8 text-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white/5 rounded-[var(--radius-1)] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-primary)]" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 gradient-text">{coffeeCount}</div>
                    <div className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                );
              }

              return (
                <div key={stat.label} className="glass rounded-[var(--radius-2)] p-6 sm:p-8 text-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white/5 rounded-[var(--radius-1)] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-primary)]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* My Approach (cards) */}
        <div className="mt-12">
          <h2 className="font-semibold mb-10 tracking-tight text-center" style={{ fontSize: 'var(--type-h2)' }}>
            My Approach
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="glass rounded-[var(--radius-2)] p-8 flex flex-col items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-[var(--radius-1)] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--type-h3)' }}>{principle.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

