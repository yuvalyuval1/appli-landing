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
  /* state */
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirUp, setScrollDirUp] = useState(true);
  const [progress, setProgress] = useState(0);
  const { openModal } = useModal();

  /* scroll listeners */
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setScrollDirUp(y < lastY);
      lastY = y;

      const doc = document.documentElement;
      const pct =
        (y / (doc.scrollHeight - window.innerHeight || 1)) * 100;
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* lock body + esc */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(p => !p);

  /* header variants */
  const headerBg =
    isOpen
      ? 'bg-surface-base shadow-md'
      : isScrolled
        ? 'bg-surface-base/80 shadow-md backdrop-blur-sm'
        : 'bg-transparent';

  return (
    <>
      {/* progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-brand-blue-300 z-50 origin-left"
        style={{ width: `${progress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />

      {/* header */}
      <motion.header
        className={`
          fixed inset-x-0 z-40 transition-colors duration-300 ${headerBg}
        `}
        animate={{ y: scrollDirUp || isOpen ? 0 : -96 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* לוגו */}
          <a href="#" className="z-50" aria-label="appli homepage">
            <Logo className="h-7 text-brand-gray-900" />
          </a>

          {/* ניווט בדסקטופ */}
          <ul className="hidden md:flex items-center gap-x-8 lg:gap-x-12">
            {navLinks.map(link => (
              <li key={link.name}>
                <motion.a
                  href={link.href}
                  className="relative font-medium text-brand-gray-700 hover:text-brand-blue-300 transition-colors"
                  whileHover="hover"
                >
                  {link.name}
                  {/* underline animation */}
                  <motion.span
                    variants={{
                      hover: { scaleX: 1 },
                      initial: { scaleX: 0 },
                    }}
                    initial="initial"
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                    className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-brand-blue-300 origin-left"
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          {/* כפתורי צד */}
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

            <motion.button
              onClick={toggleMenu}
              className="md:hidden z-50 text-brand-gray-900"
              aria-label="פתח תפריט"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9, rotate: 90 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* תפריט מובייל */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={toggleMenu}
            aria-hidden="true"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface-base shadow-lg p-8 pt-24 z-50"
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
                onClick={() => {
                  toggleMenu();
                  openModal();
                }}
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
    </>
  );
};

export default Header;
