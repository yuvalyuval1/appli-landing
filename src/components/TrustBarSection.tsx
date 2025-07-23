/* -----------------------------------------------------------------------
   TrustBarSection.tsx
   -----------------------------------------------------------------------
   • לוגואים רצים (Marquee) עם Fade‑edges מוגבל לשורת‑הלוגואים בלבד.
   • Counter “לקוחות מרוצים” – מתעורר בגלילה.
   • RTL, Reduced‑Motion, Tailwind בלבד.
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

/* ───────────  CONFIG  ───────────────────────────────────────────────── */

const partners = [
  { Icon: Partner1, label: 'AlphaSoft' },
  { Icon: Partner2, label: 'BetaWare' },
  { Icon: Partner3, label: 'Gamma Labs' },
  { Icon: Partner4, label: 'Delta Systems' },
  { Icon: Partner5, label: 'Epsilon Tech' },
  { Icon: Partner6, label: 'ZetaCloud' },
] as const;

const MIN_LOGOS_IN_LOOP   = 18;  // כדי שלא יחזור מהר
const PX_PER_SEC_DESKTOP  = 40;
const PX_PER_SEC_MOBILE   = 70;

/* ───────────  HELPERS  ─────────────────────────────────────────────── */

function duplicate<T>(arr: readonly T[], minCount: number): T[] {
  const n = Math.ceil(minCount / arr.length);
  return Array.from({ length: n }, () => arr).flat();
}

function translatePercent(dupFactor: number): string {
  return `${(-100 / dupFactor).toFixed(4)}%`;
}

/* ───────────  CHILD  COMPONENT  ────────────────────────────────────── */

interface LogoProps {
  Icon : ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}
const Logo: React.FC<LogoProps> = ({ Icon, label }) => (
  <div className="flex-shrink-0 w-32 mx-4 sm:w-40 sm:mx-6 flex items-center justify-center">
    <Icon className="h-8 sm:h-10 w-auto text-brand-gray-400 hover:text-brand-blue-300 transition-colors" />
    <span className="sr-only">{label} logo</span>
  </div>
);

/* ───────────  MAIN  ────────────────────────────────────────────────── */

const TrustBarSection: React.FC = () => {
  const [ref, inView] = useIntersection({ threshold: 0.15 });
  const clientCount   = useCountUp(inView ? 150 : 0, 2000);

  const loop = duplicate(partners, MIN_LOGOS_IN_LOOP);
  const dup  = loop.length / partners.length;

  const rowRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    if (!rowRef.current) return;

    const width     = rowRef.current.scrollWidth / dup;
    const isMobile  = window.innerWidth < 640;
    const pxPerSec  = isMobile ? PX_PER_SEC_MOBILE : PX_PER_SEC_DESKTOP;
    const seconds   = Math.max(width / pxPerSec, 8);

    setDuration(seconds);
  }, [dup]);

  /* ───────────  RENDER  ────────────────────────────────────────────── */
  return (
    <section
      id="trust"
      ref={ref}
      className="bg-surface-base py-16 sm:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        {/* כותרת + מונה */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
          מעל <span className="text-brand-lilac-300">{Math.round(clientCount)}+</span> לקוחות מרוצים
        </h2>
        <p className="mt-4 text-lg text-brand-gray-700">
          החברות המובילות כבר סומכות עלינו.
        </p>

        {/* ───── MARQUEE ───── */}
        <div className="relative mt-12 select-none overflow-hidden">
          {/* Fade‑edges – בתוך השורה בלבד */}
          <div className="pointer-events-none absolute inset-y-0 left-0  w-10 sm:w-16 bg-gradient-to-r from-surface-base to-transparent rtl:right-0 rtl:left-auto" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-surface-base to-transparent rtl:left-0  rtl:right-auto" />

          <div
            ref={rowRef}
            data-marquee
            className="flex rtl:flex-row-reverse will-change-transform"
            style={{ animation: `marquee ${duration}s linear infinite` }}
          >
            {loop.map(({ Icon, label }, i) => (
              <Logo key={i} Icon={Icon} label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* CSS מוטמע – אין JSX prop  */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-marquee] { animation: none !important; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(${translatePercent(dup)}); }
        }
      `}</style>
    </section>
  );
};

export default TrustBarSection;
