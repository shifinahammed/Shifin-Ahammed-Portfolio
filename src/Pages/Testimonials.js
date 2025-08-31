import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight } from "lucide-react";

// ✨ Centralized testimonials data (easy to add/change)
const testimonials = [
  {
    id: 1,
    name: "Afzal Ibn Shah",
    role: "Founder",
    company: "Xentrix Capital",
    content:
      "Shifin transformed our brand identity into something powerful and memorable. His vision helped us stand out in a crowded industry.",
    rating: 5,
    image: "/images/afzal.jpg", // place in public/images
  },
  {
    id: 2,
    name: "Aflah C",
    role: "Outreaching Officer",
    company: "North Bear",
    content:
      "A dedicated designer with an eye for detail. Shifin’s approach to design is professional yet empathetic, making collaboration smooth.",
    rating: 5,
    image: "/images/aflah.jpg", // place in public/images
  },
];

// ⚡ Carousel Component
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  return (
    <div className="px-6 lg:px-16 py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter">
            What People <span className="gradient-text italic font-normal">Say</span>
          </h1>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light">
            Don’t just take my word for it. Here’s what clients and collaborators have to say about working together.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="glass rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
            >
              {/* Background Quotes */}
              <Quote className="absolute top-8 left-8 w-16 h-16 text-white/5" />
              <Quote className="absolute bottom-8 right-8 w-16 h-16 text-white/5 rotate-180" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl italic leading-relaxed mb-8 text-white/90">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white/20"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-white/60 text-sm">{testimonials[currentIndex].role}</p>
                  <p className="text-[var(--accent-orange)] text-sm font-medium">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="glass glass-hover rounded-full p-3 hover:bg-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-[var(--accent-orange)] scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="glass glass-hover rounded-full p-3 hover:bg-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mini Cards (horizontal scroll) */}
        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-4 w-max lg:grid lg:grid-cols-3 lg:w-full">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                onClick={() => goToTestimonial(index)}
                className={`glass rounded-2xl p-6 cursor-pointer hover:scale-105 transition w-80 flex-shrink-0 lg:w-auto ${
                  index === currentIndex ? "ring-2 ring-[var(--color-primary)]" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border border-white/20" />
                  <div>
                    <h4 className="font-medium">{t.name}</h4>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                  "{t.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator (mobile only) */}
        <div className="flex justify-center mt-4 lg:hidden text-xs text-[var(--text-secondary)]">
          <ArrowRight className="w-4 h-4 mr-1" />
          <span>Scroll to explore</span>
        </div>
      </motion.div>
    </div>
  );
}
