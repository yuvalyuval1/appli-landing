
import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import useIntersection from '@/hooks/useIntersection';
import { Partner1, Partner2, Partner3, Partner4, Partner5, Partner6 } from '@/components/Icons';

const partners = [
    { Component: Partner1, name: 'Partner' },
    { Component: Partner2, name: 'Enterprise' },
    { Component: Partner3, name: 'Tech Co.' },
    { Component: Partner4, name: 'Startup' },
    { Component: Partner5, name: 'InnoTech' },
    { Component: Partner6, name: 'Global' },
];

const allPartners = [...partners, ...partners]; // Duplicate for seamless loop

const TrustBarSection = () => {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });
  const clientCount = useCountUp(isVisible ? 150 : 0, 2000);

  return (
    <section id="trust" ref={ref} className="bg-surface-base py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">
          מעל <span className="text-brand-lilac-300">{Math.round(clientCount)}+</span> לקוחות מרוצים
        </h2>
        <p className="mt-4 text-lg text-brand-gray-700">
          החברות המובילות במשק כבר סומכות עלינו.
        </p>
        <div className="relative mt-12 w-full">
          <div className="flex animate-marquee hover:pause">
            {allPartners.map(({ Component, name }, index) => (
              <div key={index} className="flex-shrink-0 w-48 mx-8 flex items-center justify-center">
                <Component className="h-10 object-contain text-gray-500" aria-label={`${name} logo`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
