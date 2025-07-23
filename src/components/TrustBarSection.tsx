import React, { useRef, useEffect, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import useIntersection from '@/hooks/useIntersection';
import {
  Partner1, Partner2, Partner3, Partner4, Partner5, Partner6,
} from '@/components/Icons';

/* שמות “סבירים” יותר – לוגואים קיימים, שמות חדשים */
const partners = [
  { Component: Partner1, name: 'Loopi' },
  { Component: Partner2, name: 'NanoTech' },
  { Component: Partner3, name: 'CloudWave' },
  { Component: Partner4, name: 'ByteCraft' },
  { Component: Partner5, name: 'NovaSoft' },
  { Component: Partner6, name: 'FinEdge' },
];

/* לשפע – שכפול × 3 (18 לוגואים) */
const loopPartners = [...partners, ...partners, ...partners];

const TrustBarSection: React.FC = () => {
  /* מספר הלקוחות */
  const [ref, inView] = useIntersection({ threshold: 0.15 });
  const clientCount = useCountUp(inView ? 150 : 0, 2000);

  /* חישוב מהירות הלופ */
  const rowRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);   // ברירת‑מחדל

  useEffect(() => {
    if (!rowRef.current) return;

    const width = rowRef.current.scrollWidth / 3;        // רוחב שליש רשימה
    const isMobile = window.innerWidth < 640;            // sm:640 ב‑Tailwind
    const pxPerSec = isMobile ? 80 : 40;                 // מהיר יותר במובייל
    const calc = Math.max(width / pxPerSec, 8);          // min 8s

    setDuration(calc);
  }, []);

  return (
    <section
      id="trust"
      ref={ref}
      className="relative bg-surface-base py-16 sm:py-24 overflow-hidden"
    >
      {/* דהיית קצוות – ל‑RTL ול‑LTR */}
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

        {/* שורת הלוגואים – לופ חלק */}
        <div className="relative mt-12 select-none">
          <div
            ref={rowRef}
            data-marquee
            className="flex rtl:flex-row-reverse"
            style={{ animation: `marquee ${duration}s linear infinite` }}
          >
            {loopPartners.map(({ Component, name }, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-36 sm:w-44 mx-6 sm:mx-8 flex items-center justify-center"
              >
                <Component
                  className="h-8 sm:h-10 w-auto text-brand-gray-400 hover:text-brand-blue-300 transition-colors"
                  aria-label={`${name} logo`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS מוטמע – תואם TS/JSX */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-marquee] { animation: none !important; }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); } /* שליש, כי שכפלנו ×3 */
        }
      `}</style>
    </section>
  );
};

export default TrustBarSection;
