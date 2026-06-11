import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, languagesList, Language } from './LanguageContext';

import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useLanguage();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'shyanyeews@gmail.com';

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.map'), href: '/map' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-40 bg-muji-white/95 backdrop-blur-md border-b border-muji-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-muji-text font-serif text-2xl tracking-tighter font-extrabold">
                KL <span className="instagram-gradient-text font-black">LIVING</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-[10.5px] uppercase font-extrabold tracking-widest transition-all duration-300 hover:text-muji-sand",
                  pathname === link.href ? "text-muji-sand border-b border-muji-sand/40 pb-1" : "text-muji-text-muted hover:text-muji-text"
                )}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-[10px] uppercase font-bold tracking-widest text-muji-oak hover:text-muji-text border border-muji-oak/30 px-3 py-1 rounded-sm"
              >
                {t('nav.admin')}
              </Link>
            )}

            {/* Language Selector Desktop */}
            <div className="flex items-center space-x-1.5 bg-stone-100 hover:bg-stone-200/80 px-2.5 py-1.5 rounded-sm border border-stone-300 transition-all shadow-xs cursor-pointer">
              <Globe className="h-3.5 w-3.5 text-stone-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-[11px] font-black text-stone-800 outline-none cursor-pointer pr-1 border-none focus:ring-0"
              >
                {languagesList.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-stone-900 font-sans font-semibold">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/contact"
              className="bg-muji-text text-muji-white px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-muji-accent hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md"
            >
               {t('nav.consult')}
            </Link>
          </div>

          {/* Mobile Menu Button & Mobile Lang Selector */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Quick Lang Selector for Mobile Header */}
            <div className="flex items-center space-x-1 bg-stone-100 px-2 py-1 rounded border border-stone-300">
              <Globe className="h-3 w-3 text-stone-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-[10px] font-black text-stone-800 outline-none cursor-pointer border-none focus:ring-0 p-0"
              >
                {languagesList.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muji-text p-2 hover:bg-stone-100 rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-muji-white border-b border-muji-border px-6 pt-2 pb-8 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-3 text-sm font-semibold uppercase tracking-widest transition-colors border-b border-stone-100",
                    pathname === link.href ? "text-muji-sand" : "text-muji-text hover:text-muji-sand"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-sm font-bold uppercase tracking-widest text-muji-oak border-t border-muji-border mt-2 pt-4"
                >
                  {t('nav.admin')}
                </Link>
              )}

              {/* Mobile Expanded Language Selector */}
              <div className="flex items-center justify-between bg-stone-100 px-4 py-3 rounded border border-stone-200 mt-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-stone-600" />
                  <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">选择语言 / Language:</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value as Language);
                    setIsOpen(false);
                  }}
                  className="bg-white text-xs font-black text-stone-800 outline-none cursor-pointer border border-stone-300 rounded px-2 py-1 shadow-xs"
                >
                  {languagesList.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block mt-4 bg-muji-text text-muji-white text-center py-4 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-muji-accent active:scale-95 transition-all shadow-md"
              >
                {t('nav.consult')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
