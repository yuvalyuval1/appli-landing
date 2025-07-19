
import React from 'react';

const iconProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="80" height="24" viewBox="0 0 95 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19.336 27.5L9.668 9.5H1.5L14.5 27.5H19.336Z" fill="#333333"/>
        <path d="M22.5 27.5L35.5 9.5H27.332L17.664 27.5H22.5Z" fill="#333333"/>
        <path d="M38.836 27.5L29.168 9.5H21L34 27.5H38.836Z" fill="#333333"/>
        <path d="M41.5 27.5L54.5 9.5H46.332L36.664 27.5H41.5Z" fill="#333333"/>
        <circle cx="65" cy="18.5" r="9" fill="#333333"/>
        <circle cx="85.5" cy="18.5" r="9" fill="#333333"/>
        <path d="M0.667969 27.5L10.336 9.5H18.5L5.5 27.5H0.667969Z" fill="#A9C8FF"/>
    </svg>
);

export const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><path d="m6 9 6 6 6-6" /></svg>
);

export const Menu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

export const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
);

export const Code = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);

export const Smartphone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><line x1="12" x2="12.01" y1="18" y2="18" /></svg>
);

export const Zap = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

export const Award = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconProps} {...props}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88" /></svg>
);

export const ArrowUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
);

export const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
export const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);
export const LinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
export const WhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

// Generic Partner Logos
export const Partner1 = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 100 30" {...props}><text x="50" y="20" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="gray">PARTNER</text></svg>);
export const Partner2 = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 100 30" {...props}><text x="50" y="20" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="gray">ENTERPRISE</text></svg>);
export const Partner3 = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 100 30" {...props}><text x="50" y="20" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="gray">TECH CO.</text></svg>);
export const Partner4 = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 100 30" {...props}><text x="50" y="20" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="gray">STARTUP</text></svg>);
export const Partner5 = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 100 30" {...props}><text x="50" y="20" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="gray">INNOTECH</text></svg>);
export const Partner6 = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 100 30" {...props}><text x="50" y="20" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="gray">GLOBAL</text></svg>);
