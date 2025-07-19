
import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ChevronDown } from '@/components/Icons';

const faqs = [
  {
    question: 'כמה זמן לוקח לבנות אתר?',
    answer: 'בניית אתר תדמית בסיסי אורכת בדרך כלל בין 2-4 שבועות. פרויקטים מורכבים יותר כמו חנויות או פלטפורמות יכולים לקחת מספר חודשים. הכל תלוי במורכבות הפרויקט ובזמינות התכנים מצד הלקוח.',
  },
  {
    question: 'האם אתם מספקים שירותי אחסון ותחזוקה?',
    answer: 'בהחלט. אנחנו מציעים חבילות תחזוקה ואחסון שכוללות עדכוני אבטחה, גיבויים שוטפים ותמיכה טכנית, כדי שתוכלו לישון בשקט.',
  },
  {
    question: 'באיזה טכנולוגיות אתם משתמשים?',
    answer: 'אנחנו מתמחים בטכנולוגיות מודרניות כמו React, Next.js, ו-Node.js לפיתוח צד שרת. לאפליקציות מובייל אנחנו עובדים עם React Native. אנחנו תמיד בוחרים את הכלים הנכונים למשימה.',
  },
  {
    question: 'האם האתר יהיה מותאם למובייל?',
    answer: 'חד משמעית כן. כל האתרים שאנחנו בונים הם רספונסיביים לחלוטין (Mobile-First) ונראים מעולה בכל גודל מסך.',
  },
  {
    question: 'מה לגבי SEO (קידום אתרים)?',
    answer: 'אנחנו בונים את כל האתרים שלנו עם תשתית SEO טכנית חזקה, כולל קוד סמנטי, מהירות טעינה גבוהה, ומפת אתר. זה נותן לכם נקודת פתיחה מצוינת לקידום בגוגל.',
  },
];

const FaqSection = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="bg-surface-base py-20 md:py-28">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">שאלות נפוצות</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Disclosure key={faq.question} as="div" className="bg-surface-card rounded-lg p-1">
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex justify-between items-center text-right p-4 text-lg font-medium text-brand-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-brand-blue-300 focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6 text-brand-lilac-300" />
                    </motion.div>
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pb-4 pt-2 text-brand-gray-700">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
