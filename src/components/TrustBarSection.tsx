import React, { useRef, useEffect, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import useIntersection from '@/hooks/useIntersection';
import {
  Partner1, Partner2, Partner3, Partner4, Partner5, Partner6,
} from '@/components/Icons';

/* שורת לוגואים – הרחב/י כרצונך */
const partners = [
  { Component: Partner1, name: 'Partner' },
  { Component: Partner2, name: 'Enterprise' },
  { Component: Partner3, name: 'Tech Co.' },
  { Component: Partner4, name: 'Startup' },
  { Component: Partner5, name: 'InnoTech' },
  { Component: Partner6, name: 'Global' },
];

/* משכפלים פעמיים לקבלת לופ חלק */
const loopPartners = [...partners, ...partners];

const TrustBarSection: React.FC = () => {
  /* אנימציית כניסה למספר הלקוחות */
  const [ref, isVisible] = useIntersection({ threshold: 0.15 });
  const clientCount = useCountUp(isVisible ? 150 : 0, 2_000);

  /* מהירות מרקיז דינמית לפי רוחב התוכן */
  const rowRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20); // ברירת מחדל 20s

  useEffect(() => {
    if (!rowRef.current) return;
    const totalWidth = rowRef.current.scrollWidth / 2; // רוחב חצי (רשימה לא משוכפלת)
    // מחלק רוחב בפיקסלים ב‑40 כדי לקבל משך די עקבי (px/s)
    setDuration(Math.max(totalWidth / 40, 10)); // מינימום 10s
  }, []);

  return (
    <section
      id="trust"
      ref={ref}
      className="relative bg-surface-base py-16 sm:py-24 overflow-hidden"
    >
      {/* דהייה עדינה בקצוות כדי “לחתוך” את הלופ */}
      <div className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-surface-base to-transparent sm:w-24 rtl:right-0" />
      <div className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-l from-surface-base to-transparent left-0 sm:w-24 rtl:left-0 rtl:right-auto" />

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

        {/* שורת הלוגואים – RTL‑friendly */}
        <div className="relative mt-12 select-none">
          <div
            ref={rowRef}
            className="flex rtl:flex-row-reverse"
            /*   tailwind arbitrary value: [animation-duration:_${duration}s] */
            style={{ animation: `marquee ${duration}s linear infinite` }}
          >
            {loopPartners.map(({ Component, name }, i) => (
              <div
                key={i}
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

        {/* למשתמשים שמעדיפים Reduced‑Motion – מציגים סטטי */}
        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            div[style*='marquee'] {
              animation: none !important;
            }
          }

          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrustBarSection;
