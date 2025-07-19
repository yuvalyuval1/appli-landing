
import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '@/hooks/useModal';

const plans = [
  {
    name: 'בסיסי',
    price: 'החל מ-₪5,000',
    description: 'לאתרי תדמית ועסקים קטנים',
    features: ['אתר תדמית עד 5 עמודים', 'עיצוב רספונסיבי', 'טופס יצירת קשר', 'אופטימיזציית SEO בסיסית'],
    isPopular: false,
  },
  {
    name: 'פרו',
    price: 'החל מ-₪15,000',
    description: 'לחנויות אונליין ופלטפורמות',
    features: ['כל מה שבחבילה הבסיסית', 'חנות איקומרס מלאה', 'מערכת ניהול תוכן (CMS)', 'אינטגרציות צד שלישי'],
    isPopular: true,
  },
  {
    name: 'מותאם אישית',
    price: 'צרו קשר',
    description: 'לאפליקציות ופרויקטים מורכבים',
    features: ['פיתוח אפליקציית מובייל', 'מערכות מורכבות', 'פתרונות SaaS', 'תמיכה וליווי צמוד'],
    isPopular: false,
  },
];

const PricingSection = () => {
  const { openModal } = useModal();

  return (
    <section id="pricing" className="bg-surface-card py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">תמחור גמיש ושקוף</h2>
          <p className="mt-4 text-lg text-brand-gray-700 max-w-2xl mx-auto">
            בחרו את החבילה שמתאימה לכם, או דברו איתנו להתאמה אישית.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-surface-base p-8 rounded-2xl shadow-lg flex flex-col h-full ${plan.isPopular ? 'border-2 border-brand-lilac-300 lg:scale-105' : 'border border-gray-200'}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 right-8 bg-brand-lilac-300 text-white px-4 py-1 rounded-full font-bold text-sm">הכי פופולרי</div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-brand-gray-900">{plan.name}</h3>
                <p className="text-brand-gray-700 mt-2">{plan.description}</p>
                <div className="mt-6 text-4xl font-extrabold text-brand-gray-900">
                  {plan.price}
                </div>
                <ul className="mt-8 space-y-4 text-right">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-brand-blue-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => openModal(plan.name)}
                className={`mt-10 w-full py-3 rounded-lg font-bold text-lg transition-colors ${plan.isPopular ? 'bg-brand-gray-900 text-white hover:bg-brand-gray-700' : 'bg-brand-blue-300/20 text-brand-blue-500 hover:bg-brand-blue-300/40'}`}
              >
                בחר חבילה
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;