
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Smartphone, Code, Award } from '@/components/Icons';

const benefits = [
  {
    icon: <Zap className="h-10 w-10 text-brand-yellow-400" />,
    title: 'מהירות שיא',
    description: 'אתרים ואפליקציות מהירים במיוחד לחווית משתמש מעולה ו-SEO גבוה.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-brand-blue-300" />,
    title: 'עיצוב רספונסיבי',
    description: 'התאמה מושלמת לכל מסך - ממובייל ועד דסקטופ, לחוויה אחידה ומרשימה.',
  },
  {
    icon: <Code className="h-10 w-10 text-brand-lilac-300" />,
    title: 'טכנולוגיה מתקדמת',
    description: 'שימוש בכלים ובפריימוורקים הכי חדשניים בשוק ליציבות וביצועים.',
  },
  {
    icon: <Award className="h-10 w-10 text-brand-peach-300" />,
    title: 'איכות ללא פשרות',
    description: 'ליווי אישי, קוד נקי ותמיכה טכנית כדי להבטיח שהמוצר שלכם תמיד באוויר.',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const BenefitsSection = () => {
  return (
    <section className="bg-surface-card py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">למה דווקא appli?</h2>
          <p className="mt-4 text-lg text-brand-gray-700 max-w-2xl mx-auto">
            אנחנו לא רק בונים אתרים, אנחנו בונים חוויות דיגיטליות שמניעות צמיחה.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="bg-surface-base p-8 rounded-xl shadow-sm text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -10, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="inline-block p-4 bg-surface-card rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-brand-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;