/* --------------------------------------------------------------------------
   TrustBarSection.tsx
   שורת לוגואים רצה, מותאמת מובייל/דסקטופ, RTL‑friendly, Reduced‑Motion,
   + מונה לקוחות מתעורר בגלילה. אין תלות חיצונית מעבר ל‑Tailwind ו‑React.
   -------------------------------------------------------------------------- */

import React, { useRef, useEffect, useState, type ComponentType } from 'react';
import useIntersection from '@/hooks/useIntersection';
import { useCountUp } from '@/hooks/useCountUp';
import {
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
  Partner6,
} from '@/components/Icons';

/* ----------  CONFIG  ---------------------------------------------------- */
// 1. שמות דמיוניים “אמינים”.
const partners = [
  { Component: Partner1, name: 'AlphaSoft' },
  { Component: Partner2, name: 'BetaWare' },
  { Component: Partner3, name: 'Gamma Labs' },
  { Component: Partner4, name: 'Delta Systems' },
  { Component: Partner5, name: 'Epsilon Tech' },
  { Component: Partner6, name: 'ZetaCloud' },
];

/* כמה לוגואים נרצה בלופ כדי שלא ייגמר מהר מדי? */
const MIN_LOGOS_IN_LOOP = 18; // ≥ 18 נראה טבעי על דסקטופ רחב

/* פרופורציה מהירות (px / s)  – מהיר יותר במובייל כדי שלא “יזחל” */
const PX_PER_SEC_DESKTOP = 40;
const PX_PER_SEC_MOBILE  = 70;

/* ----------  HELPERS  --------------------------------------------------- */
const buildLoop = <T,>(arr: T[], minTotal: number): T[] => {
  const loops = Math.ceil(minTotal / arr.length);
  // flat() ⩾ ES2019 – קיים בפרויקטי Vite/TS סטנדרטיים
  // eslint-disable-next-line fp/no-loops
  return Array.from({ length: loops }, () => arr).flat();
};

/* ----------  COMPONENT  ------------------------------------------------- */
const TrustBarSection: React.FC = () => {
  /* מופעל בגלילה – 150 → 0 ב‑2 שניות */
  const [sectionRef, inView] = useIntersection({ threshold: 0.15 });
  const clientCount         = useCountUp(inView ? 150 : 0, 2_000);

  /* חשב משך אנימציה (s) דינמי לגודל המסך */
  const rowRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  /* בחר כמה פעמים לשכפל כדי להגיע ל‑MIN_LOGOS_IN_LOOP */
  const loopPartners = buildLoop(partners, MIN_LOGOS_IN_LOOP);

  useEffect(() => {
    if (!rowRef.current) return;

    const baseWidth   = rowRef.current.scrollWidth / (loopPartners.length / partners.length); // רוחב “סט” אחד
    const isMobile    = window.innerWidth < 640; // Tailwind sm < 640
    const pxPerSecond = isMobile ? PX_PER_SEC_MOBILE : PX_PER_SEC_DESKTOP;
    const seconds     = Math.max(baseWidth / pxPerSecond, 8); // הבטחת ≥ 8 s

    setDuration(seconds);
  }, [loopPartners]);

  /* ----------  RENDER  -------------------------------------------------- */
  return (
    <section
      id="trust"
      ref={sectionRef}
      className="relative bg-surface-base py-16 sm:py-24 overflow-hidden"
    >
      {/* Fade edges – מתאים RTL / LTR אוטומטית */}
      <div className="pointer-events-none absolute inset-y-0 left-0  w-16 sm:w-24 bg-gradient-to-r from-surface-base to-transparent rtl:right-0 rtl:left-auto" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-surface-base to-transparent rtl:left-0  rtl:right-auto" />

      <div className="container mx-auto px-6 text-center">
        {/* כותרת + מונה דינמי */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
          מעל{' '}
          <span className="text-brand-lilac-300">
            {Math.round(clientCount)}+
          </span>{' '}
          לקוחות מרוצים
        </h2>
        <p className="mt-4 text-lg text-brand-gray-700">
          החברות המובילות כבר סומכות עלינו.
        </p>

        {/* מרקיז – flex רציף */}
        <div className="relative mt-12 select-none">
          <div
            ref={rowRef}
            data-marquee
            className="flex rtl:flex-row-reverse will-change-transform"
            style={{ animation: `marquee ${duration}s linear infinite` }}
          >
            {loopPartners.map(({ Component, name }, idx) => (
              <LogoItem
                key={idx}
                Icon={Component}
                label={name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS מוטמע – אין styled‑jsx ולכן אין TS error */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-marquee] { animation: none !important; }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${(100 / (loopPartners.length / partners.length)).toFixed(4)}%); }
          /* ‎-X% בדיוק יחסי לכמה “סטים” יש, כך שהלופ חלק */
        }
      `}</style>
    </section>
  );
};

/* ----------  CHILD  ---------------------------------------------------- */
interface LogoItemProps {
  Icon : ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const LogoItem: React.FC<LogoItemProps> = ({ Icon, label }) => (
  <div className="flex-shrink-0 w-32   mx-4   sm:w-40 sm:mx-6 flex items-center justify-center">
    <Icon
      className="h-8 sm:h-10 w-auto text-brand-gray-400 hover:text-brand-blue-300 transition-colors"
      aria-label={`${label} logo`}
      title={label}
    />
  </div>
);

export default TrustBarSection;
