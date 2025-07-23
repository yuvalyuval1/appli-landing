import React, { useRef, useEffect, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import useIntersection from '@/hooks/useIntersection';
import {
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
  Partner6,
} from '@/components/Icons';

/* לוגואים – אפשר להוסיף כאן חברות נוספות */
const partners = [
  { Component: Partner1, name: 'Partner.io' },
  { Component: Partner2, name: 'Enterprisy' },
  { Component: Partner3, name: 'Techio.Co.' },
  { Component: Partner4, name: 'Startupnow' },
  { Component: Partner5, name: 'InnoTech' },
  { Component: Partner6, name: 'Globali/ai' },
];

/* משכפלים כדי לקבל לולאה רציפה */
const loopPartners = [...partners, ...partners];

const TrustBarSection: React.FC = () => {
  /* אנימציית המספר */
  const [ref, isVisible] = useIntersection({ threshold: 0.15 });
  const clientCount = useCountUp(isVisible ? 150 : 0, 2000);

  /* חישוב זמן האנימציה לפי רוחב השורה */
  const rowRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    if (!rowRef.current) return;
    const width = rowRef.current.scrollWidth / 2;     // רוחב חצי‑רשימה
    setDuration(Math.max(width / 40, 10));            // px / 40 ≈ sec; min 10 s
  }, []);

  return (
    <section
      id="trust"
      ref={ref}
      className="relative bg-surface-base py-16 sm:py-24 overflow-hidden"
    >
      {/* דהיית קצוות – RTL/‏LTR תואם */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-surface-base to-transparent rtl:right-0 rtl:left-auto" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-surface-base to-transparent rtl:left-0 rtl:right-auto" />

      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
          מעל{' '}
          <span className="text-brand-lilac-300">
            {Math.round(clientCount)}+
          </span>{' '}
          לקוחות מרוצים
        </h2>

        <p className="mt-4 text-lg text-brand-gray-700">
          החברות המובילות במשק כבר סומכות עלינו.
        </p>

        {/* שורת הלוגואים במרקיז רציף */}
        <div className="relative mt-12 select-none">
          <div
            ref={rowRef}
            data-marquee
            className="flex rtl:flex-row-reverse"
            style={{ animation: `marquee ${duration}s linear infinite` }}
          >
            {loopPartners.map(({ Component, name }, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-40 mx-6 sm:w-48 sm:mx-8 flex items-center justify-center"
              >
                <Component
                  className="h-10 w-auto text-brand-gray-400 hover:text-brand-blue-300 transition-colors"
                  aria-label={`${name} logo`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS מוטמע – בלי styled‑jsx */}
      <style>{`
        /* מכבד העדפת Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          [data-marquee] { animation: none !important; }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TrustBarSection;
