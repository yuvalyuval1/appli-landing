
import React from 'react';

// Components
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustBarSection from '@/components/TrustBarSection';
import BenefitsSection from '@/components/BenefitsSection';
import ServicesSection from '@/components/ServicesSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import BackToTopButton from '@/components/BackToTopButton';

// Context
import { ModalProvider } from '@/contexts/ModalContext';

export default function App() {
  return (
    <ModalProvider>
      <div dir="rtl">
        <a href="#main-content" className="skip-to-content">דלג לתוכן המרכזי</a>
        <Header />
        <main id="main-content">
          <HeroSection />
          <TrustBarSection />
          <BenefitsSection />
          <ServicesSection />
          <PricingSection />
          <FaqSection />
        </main>
        <Footer />
        <ContactModal />
        <BackToTopButton />
      </div>
    </ModalProvider>
  );
}
