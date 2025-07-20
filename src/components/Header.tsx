// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Logo } from '@/components/Icons';
import { useModal } from '@/hooks/useModal';

const navLinks = [
  { name: 'שירותים', href: '#services' },
  { name: 'תמחור', href: '#pricing' },
  { name: 'שאלות נפוצות', href: '#faq' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-40 transition-all duration-300
        ${isScrolled
          ? 'bg-surface-base/80 shadow-md backdrop-blur-sm'
          : 'bg-transparent'}
      `}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* לוגו */}
        <a href="#" className="z-50" aria-label="appli homepage">
          <Logo className="h-7 text-brand-gray-900" />
        </a>

        {/* ניווט שולחן עבודה – gap במקום margin */}
        <ul className="hidden md:flex items-center gap-x-8 lg:gap-x-12">
          {navLinks.map(link => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-brand-gray-700 hover:text-brand-blue-300 transition-colors font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* כפתורים ימין */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => openModal()}
            className="
              hidden md:inline-block bg-brand-gray-900 text-white
              px-6 py-2 rounded-lg font-semibold
              hover:bg-brand-gray-700 transition-colors
            "
          >
            דברו איתנו
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden z-50 text-brand-gray-900"
            aria-label="פתח תפריט"
            aria-expanded={isOpen}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* תפריט נפתח במובייל – gap-y במקום mb */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface-base shadow-lg p-8 pt-24"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <ul className="flex flex-col gap-y-6">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="text-2xl font-semibold text-brand-gray-900 hover:text-brand-blue-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { toggleMenu(); openModal(); }}
                className="
                  mt-12 w-full bg-brand-gray-900 text-white
                  px-6 py-3 rounded-lg font-bold text-lg
                  hover:bg-brand-gray-700 transition-colors
                "
              >
                דברו איתנו
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
