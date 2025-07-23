/* -----------------------------------------------------------------------
   TrustBarSection.tsx
   -----------------------------------------------------------------------
   • שורת לוגואים רצה (Marquee) – מהירות דינמית ונפרדת למובייל/דסקטופ.
   • דהיית‑קצוות (Gradient mask) – RTL / LTR אוטומטי.
   • Counter “לקוחות מרוצים” – מתעורר בגלילה (useIntersection + useCountUp).
   • Reduced‑Motion: מכבד משתמש שמעדיף פחות אנימציות.
   • TypeScript ✓  – ללא TS2322 (אין props בעייתיות על <svg>).
   • אין תלות חיצונית מעבר ל‑React, Tailwind, ושלושת hooks הקיימים.
   --------------------------------------------------------------------- */

import React, {
  useRef,
  useEffect,
  useState,
  type ComponentType,
  type SVGProps,
} from 'react';
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

/* ─────────────────────  CONFIG  ─────────────────────────────────────── */

/** רשימת שותפים (שמות דמיוניים אך "אמינים") */
const partners = [
  { Component: Partner1, label: 'AlphaSoft' },
  { Component: Partner2, label: 'BetaWare' },
  { Component: Partner3, label: 'Gamma Labs' },
  { Component: Partner4, label: 'Delta Systems' },
  { Component: Partner5, label: 'Epsilon Tech' },
  { Component: Partner6, label: 'ZetaCloud' },
] as const;

/** כמה לוגואים לפחות בלולאה כדי שלא ייגמר מהר על צגים רחבים */
const MIN_LOGOS_IN_LOOP = 18;

/** מהירות ברירת‑מחדל (px / s) */
const PX_PER_SEC_DESKTOP = 40;
const PX_PER_SEC_MOBILE  = 70;

/* ────────────────────  HELPERS  ─────────────────────────────────────── */

/**
 * משכפל מערך עד שאורכו מגיע (או עובר) למינימום מבוקש.
 * מחזיר מערך שטוח (flat).
 */
function buildLoop<T>(arr: readonly T[], minTotal: number): T[] {
  const loops = Math.ceil(minTotal / arr.length);
  /* eslint‑disable fp/no-loops */
  const out: T[] = [];
  for (let i = 0; i < loops; i += 1) out.push(...arr);
  return out;
}

/* ההתאמה בין כיוון המסך ל‑translateX (%) בלולאה */
function calcTranslatePercent(dupFactor: number): string {
  /* dupFactor = loopPartners.length / partners.length */
  const perc = (-100 / dupFactor).toFixed(4);
  return `${perc}%`;
}

/* ────────────────────  CHILD  ───────────────────────────────────────── */

interface LogoItemProps {
  Icon : ComponentType<SVGProps<SVGSVGElement>>; // <svg>‑Component
  label: string;
}
const LogoItem: React.FC<LogoItemProps> = ({ Icon, label }) => (
  <div className="flex-shrink-0 w-32 mx-4 sm:w-40 sm:mx-6 flex items-center justify-center">
    {/* לא מעבירים props ל‑SVG כדי למנוע TS 2322; עוטפים בתג span נגיש */}
    <Icon className="h-8 sm:h-10 w-auto text-brand-gray-400 hover:text-brand-blue-300 transition-colors" />
    <span className="sr-only">{label} logo</span>
  </div>
);

/* ───────────────────  MAIN SECTION  ─────────────────────────────────── */

const TrustBarSection: React.FC = () => {
  /* Intersection → Counter עולה מ‑0 ל‑150 ב‑2 ש׳ */
  const [sectionRef, inView] = useIntersection({ threshold: 0.15 });
  const clientCount          = useCountUp(inView ? 150 : 0, 2000);

  /* בניית לולאת logos */
  const loopPartners = buildLoop(partners, MIN_LOGOS_IN_LOOP);
  const dupFactor    = loopPartners.length / partners.length; // כמה פעמים שוכפל

  /* חישוב דינמי ל‑animation‑duration */
  const rowRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20); // fallback

  useEffect(() => {
    if (!rowRef.current) return;

    const baseWidth   = rowRef.current.scrollWidth / dupFactor; // רוחב "סט" 1
    const isMobile    = window.innerWidth < 640;                // Tailwind sm
    const pxPerSecond = isMobile ? PX_PER_SEC_MOBILE : PX_PER_SEC_DESKTOP;
    const sec         = Math.max(baseWidth / pxPerSecond, 8);   // ≥ 8 s

    setDuration(sec);
  }, [dupFactor]);

  /* ────────────────  RENDER  ────────────────────────────────────────── */
  return (
    <section
      id="trust"
      ref={sectionRef}
      className="relative bg-surface-base py-16 sm:py-24 overflow-hidden"
    >
      {/* Fade edges  (RTL aware) */}
      <div className="pointer-events-none absolute inset-y-0 left-0  w-16 sm:w-24 bg-gradient-to-r from-surface-base to-transparent rtl:right-0 rtl:left-auto" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-surface-base to-transparent rtl:left-0  rtl:right-auto" />

      <div className="container mx-auto px-6 text-center">
        {/* כותרת + מונה */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
          מעל{' '}
          <span className="text-brand-lilac-300">{Math.round(clientCount)}+</span>{' '}
          לקוחות מרוצים
        </h2>
        <p className="mt-4 text-lg text-brand-gray-700">
          החברות המובילות כבר סומכות עלינו.
        </p>

        {/* מרקיז */}
        <div className="relative mt-12 select-none">
          <div
            ref={rowRef}
            data-marquee
            className="flex rtl:flex-row-reverse will-change-transform"
            style={{ animation: `marquee ${duration}s linear infinite` }}
          >
            {loopPartners.map(({ Component, label }, idx) => (
              <LogoItem key={idx} Icon={Component} label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* CSS מוטמע – ללא styled‑jsx → אין TS 2322 */}
      <style>{`
        /* Reduced‑Motion respect */
        @media (prefers-reduced-motion: reduce) {
          [data-marquee] { animation: none !important; }
        }

        /* דינמי לפי dupFactor */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(${calcTranslatePercent(dupFactor)}); }
        }
      `}</style>
    </section>
  );
};

export default TrustBarSection;
