
import React from 'react';
import { Logo, Facebook, Instagram, LinkedIn, WhatsApp } from '@/components/Icons';

const socialLinks = [
  { name: 'Facebook', href: '#', Icon: Facebook },
  { name: 'Instagram', href: '#', Icon: Instagram },
  { name: 'LinkedIn', href: '#', Icon: LinkedIn },
  { name: 'WhatsApp', href: '#', Icon: WhatsApp },
];

const Footer = () => {
  return (
    <footer className="bg-brand-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          <div>
            <Logo className="h-8 mb-4 filter invert" />
            <p className="text-gray-400">פתרונות דיגיטליים חכמים לעסקים. <br />בונים את העתיד, שורה אחת של קוד בכל פעם.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white">שירותים</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white">תמחור</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white">שאלות נפוצות</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">עקבו אחרינו</h3>
            <div className="flex space-x-4 space-x-reverse justify-end md:justify-start">
              {socialLinks.map(({ name, href, Icon }) => (
                <a key={name} href={href} className="text-gray-400 hover:text-white" aria-label={name}>
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} appli. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;