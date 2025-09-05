import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Easter Egg 1: Button hover counter
  const [hoverCount, setHoverCount] = useState(0);

  const services = ["Logo Design", "Branding", "UI/UX", "Digital Marketing", "Other"];
  const recipientEmail = "byshifin@gmail.com";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (service) => {
    setFormData({ ...formData, projectType: service });
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      setFormState({ status: "error", message: "Please fill out all fields." });
      return;
    }

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      `Project Inquiry: ${formData.projectType}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    setFormState({
      status: "success",
      message: "Your email client should open. Thanks for reaching out!",
    });

    setFormData({ name: "", email: "", projectType: "", message: "" });
  };

  // Easter Egg 1: Button label logic
  const getButtonLabel = () => {
    if (formState.status === "submitting") return "Sending...";
    if (hoverCount >= 3 && hoverCount < 6) return "You sure? 👀";
    if (hoverCount >= 6) return "Okay fine, send it 🚀";
    return "Send Message";
  };

  // Auto-hide success/error messages after 4 seconds
  useEffect(() => {
    if (formState.status === "success" || formState.status === "error") {
      const timer = setTimeout(() => {
        setFormState({ status: "idle", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formState]);

  return (
    <div className="px-6 sm:px-12 md:px-16 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-bold mb-4 tracking-tight text-4xl lg:text-5xl">
            Let’s <span className="gradient-text italic font-normal">Connect</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[var(--color-text-secondary)] text-lg">
            Have a project in mind? Tell me about it — I’ll make it happen.
          </p>
        </div>

        {/* Contact Form */}
        <div className="glass rounded-[var(--radius-2)] p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Tony Stark (but less dramatic)"
                  className="w-full bg-white/5 text-[var(--color-text-primary)] 
                             placeholder:text-[var(--color-text-secondary)] 
                             placeholder:opacity-40 focus:placeholder:opacity-0 
                             border border-white/10 rounded-[var(--radius-1)] 
                             px-3 py-2 transition-all 
                             focus:border-[var(--color-primary)] 
                             focus:ring-1 focus:ring-[var(--color-primary-light)]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="we won’t spam… unless it’s memes"
                  className="w-full bg-white/5 text-[var(--color-text-primary)] 
                             placeholder:text-[var(--color-text-secondary)] 
                             placeholder:opacity-40 focus:placeholder:opacity-0 
                             border border-white/10 rounded-[var(--radius-1)] 
                             px-3 py-2 transition-all 
                             focus:border-[var(--color-primary)] 
                             focus:ring-1 focus:ring-[var(--color-primary-light)]"
                />
              </div>
            </div>

            {/* Styled Project Type Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Select a Service <span className="text-red-400">*</span>
              </label>
              <div
                className="glass rounded-[var(--radius-1)] px-3 py-2 flex justify-between items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span
                  className={`${
                    formData.projectType ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {formData.projectType || "Select a service..."}
                </span>
                <ChevronDown className="w-5 h-5 text-[var(--color-text-tertiary)]" />
              </div>
              {dropdownOpen && (
                <ul className="absolute w-full mt-1 bg-black text-white rounded-[var(--radius-1)] border border-white/20 z-10 shadow-lg">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="px-3 py-2 hover:bg-white/10 cursor-pointer transition"
                      onClick={() => handleSelect(service)}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Tell me about your project <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="your brand’s hopes, dreams, or a good coffee recipe ☕"
                className="w-full bg-white/5 text-[var(--color-text-primary)] 
                           placeholder:text-[var(--color-text-secondary)] 
                           placeholder:opacity-40 focus:placeholder:opacity-0 
                           border border-white/10 rounded-[var(--radius-1)] 
                           px-3 py-2 resize-none transition-all 
                           focus:border-[var(--color-primary)] 
                           focus:ring-1 focus:ring-[var(--color-primary-light)]"
              />
            </div>

            {/* Status + Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
              <div
                aria-live="polite"
                className={`flex items-center gap-2 text-sm transition-opacity ${
                  formState.status === "success" || formState.status === "error"
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {formState.status === "success" && <CheckCircle className="w-5 h-5 text-green-400" />}
                {formState.status === "error" && <AlertTriangle className="w-5 h-5 text-red-400" />}
                <span>{formState.message}</span>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setHoverCount((c) => c + 1)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] 
                           to-[var(--color-primary-dark)] text-white px-6 py-2 
                           rounded-[var(--radius-1)] font-semibold hover:scale-105 
                           transition disabled:opacity-50 disabled:cursor-wait self-start sm:self-auto"
                disabled={formState.status === "submitting"}
              >
                {getButtonLabel()}
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
