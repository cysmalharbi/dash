import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sparkles, Send, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'about', label: 'عني' },
    { id: 'skills', label: 'المهارات' },
    { id: 'projects', label: 'المشاريع' },
    { id: 'experience', label: 'الخبرات' },
    { id: 'contact', label: 'تواصل معي' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/20 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo ABDULLAH.SYS */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="group flex items-center gap-3 text-right"
          >
            <div className="flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#0f1115] border border-emerald-400/30 text-emerald-400 font-syne font-black tracking-tight text-lg shadow-sm group-hover:border-emerald-400 transition-all">
              ABDULLAH.SYS
            </div>
            <div className="hidden sm:block">
              <span className="text-xs text-slate-400 font-mono-tech block">
                // FRONTEND ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-[#0f1115]/90 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono-tech font-bold uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-black shadow-sm'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action buttons Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-mono-tech font-bold uppercase transition-all btn-accent cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>تواصل مباشر</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-200 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
              aria-label="القائمة الجانبية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#0b0c10]/98 backdrop-blur-2xl border-b border-white/10 p-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-2 font-mono-tech">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold uppercase transition-all text-right cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-black font-extrabold'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-black" />}
                </button>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-black btn-accent cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>بدء مشروع جديد</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
