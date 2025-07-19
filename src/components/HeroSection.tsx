
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from '@/components/Icons';
import { useModal } from '@/hooks/useModal';

const HeroSection = () => {
  const { openModal } = useModal();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white bg-gradient-to-b from-brand-blue-300 via-brand-lilac-300 to-brand-peach-300">
      <div className="container mx-auto px-6 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-gray-900 drop-shadow-sm"
        >
          העסק שלך, דיגיטלי, בקלות.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-brand-gray-700"
        >
          אנחנו בונים אתרים ואפליקציות שפשוט עובדים. מהר, יפה וחכם.
          הפתרון הדיגיטלי שלך מתחיל כאן.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <button 
            onClick={() => openModal()}
            className="bg-brand-gray-900 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-brand-gray-700 transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            דברו איתנו
          </button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#trust" aria-label="Scroll down">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;