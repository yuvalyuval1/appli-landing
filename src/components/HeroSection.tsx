import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from '@/components/Icons';
import { useModal } from '@/hooks/useModal';

const HeroSection: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section
      id="hero"
      className="
        relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center
        text-white bg-gradient-to-b from-blue-400 via-purple-300 to-pink-200 overflow-hidden
      "
    >
      {/* שם האתר */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <span className="uppercase text-2xl md:text-3xl font-bold tracking-widest drop-shadow-lg">
          APPLI
        </span>
      </div>

      {/* רקע כהה קל כדי לשפר קונטרסט */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative container mx-auto px-6 z-30 space-y-6">
        {/* כותרת */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-xl"
        >
          העסק שלך, דיגיטלי, בקלות.
        </motion.h1>

        {/* תת־כותרת */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/90"
        >
          אנחנו בונים אתרים ואפליקציות שפשוט עובדים. מהר, יפה וחכם.
          הפתרון הדיגיטלי שלך מתחיל כאן.
        </motion.p>

        {/* כפתור CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={openModal}
            className="
              inline-block bg-white text-blue-600 px-8 py-3 rounded-full text-base sm:text-lg font-bold
              hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/50
              transition-transform duration-300 hover:scale-105 drop-shadow-lg
            "
          >
            דברו איתנו
          </button>
        </motion.div>
      </div>

      {/* חץ גלילה */}
      <motion.div
        className="absolute bottom-8 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a
          href="#services"
          aria-label="Scroll down"
          className="inline-block focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronDown className="h-8 w-8 text-white/80" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
