
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  {
    title: 'פיתוח אפליקציות',
    description: 'מאפס לרעיון, אנחנו מפתחים אפליקציות iOS ו-Android שמשתמשים אוהבים. עם דגש על חווית משתמש אינטואיטיבית וביצועים חלקים.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    title: 'בניית אתרים',
    description: 'אתרי תדמית, חנויות איקומרס ופלטפורמות מורכבות. כל אתר שאנחנו בונים הוא מהיר, מאובטח ומותאם למנועי חיפוש.',
    imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'אינטגרציות ומערכות',
    description: 'חיבור המערכות הקיימות שלך, אוטומציות חכמות ופיתוח API. אנחנו עוזרים לך לייעל תהליכים ולחסוך זמן וכסף.',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

const ServicePanel = ({ title, description, imageUrl }: typeof services[0]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <div ref={ref} className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-8">
        <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>
        <p className="mt-4 max-w-lg text-lg">{description}</p>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="bg-surface-base py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">השירותים שלנו</h2>
          <p className="mt-4 text-lg text-brand-gray-700 max-w-2xl mx-auto">
            פתרונות מקצה לקצה שמותאמים בדיוק לצרכים של העסק שלך.
          </p>
        </div>
        <div className="space-y-16">
          {services.map((service) => (
            <ServicePanel
              key={service.title}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
