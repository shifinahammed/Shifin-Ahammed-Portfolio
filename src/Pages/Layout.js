import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, UserRound, Briefcase, MessageCircle, Mail, Menu, X, Instagram, Linkedin, Twitter } from "lucide-react";

// Helper function moved inside the file to fix import error
const createPageUrl = (pageName) => {
  switch (pageName) {
    case "Home": return "/";
    case "About": return "/about";
    case "Projects": return "/projects";
    case "Testimonials": return "/testimonials";
    case "Contact": return "/contact";
    default: return "/";
  }
};

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Home },
  { title: "About", url: createPageUrl("About"), icon: UserRound },
  { title: "Projects", url: createPageUrl("Projects"), icon: Briefcase },
  { title: "Testimonials", url: createPageUrl("Testimonials"), icon: MessageCircle },
  { title: "Contact", url: createPageUrl("Contact"), icon: Mail },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/_shifinahammed", color: "hover:text-pink-400" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/shifinahammed", color: "hover:text-blue-400" },
  { name: "X", icon: Twitter, url: "https://x.com/shifinahmmd", color: "hover:text-gray-300" },
  { name: "Behance", icon: Briefcase, url: "https://behance.net/shifinahammed", color: "hover:text-blue-500" }
];

export default function Layout({ children }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Close menu on route change
    setIsMenuOpen(false);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-4 py-2 rounded-lg">
        Skip to main content
      </a>
      {/* Styles are now in index.css, so the <style> block is removed */}
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans overflow-x-hidden">
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden fixed top-4 left-4 z-[60] glass rounded-full p-3"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        {/* Floating Let's Talk Button */}
        <Link
          to={createPageUrl("Contact")}
          className="fixed top-4 right-4 z-50 glass glass-hover rounded-full px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 group transition-all duration-200"
        >
          <Mail className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
          <span className="hidden sm:inline text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
            Let's Talk
          </span>
        </Link>

        {/* Sidebar Navigation */}
        <aside className={`fixed left-0 top-0 h-full w-72 lg:w-[300px] p-4 z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="glass rounded-[var(--radius-3)] p-6 h-full flex flex-col overflow-hidden">
            {/* Profile Section */}
            <div className="text-center mb-10 flex-shrink-0">
              <div className="relative inline-block mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d38ec5bab_shifinanimoji.png"
                  alt="Shifin Ahammed"
                  className="w-20 h-20 rounded-full"
                  loading="eager"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[var(--color-bg)]"></div>
              </div>
              <h2 className="text-lg font-semibold mb-1 tracking-tight text-[var(--color-text-primary)]">Shifin Ahammed</h2>
              <p className="text-sm text-[var(--color-text-tertiary)] font-medium">Product Designer</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-4 px-4 py-3 rounded-[var(--radius-1)] transition-all duration-200 group ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'hover:bg-white/[0.05] hover:translate-x-1'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white' : 'text-[var(--color-text-tertiary)] group-hover:text-white'
                    }`} />
                    <span className={`font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-[var(--color-text-secondary)] group-hover:text-white'
                    }`}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Social Media & Footer */}
            <div className="pt-6 mt-auto border-t border-white/[0.05] flex-shrink-0">
              <div className="flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:scale-110 ${social.color}`}
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main 
          id="main-content"
          className="lg:ml-[300px] min-h-screen transition-transform"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          {children}
        </main>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </>
  );
}