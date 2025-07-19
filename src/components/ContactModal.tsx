
import React, { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from '@/components/Icons';
import { useForm } from '@/hooks/useForm';
import { useModal } from '@/hooks/useModal';

const ContactModal = () => {
  const { isModalOpen, closeModal, selectedPackage } = useModal();

  const {
    values,
    handleChange,
    handleSubmit,
    status,
    message,
    resetForm,
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      _gotcha: '', // Honeypot field
      package: '',
    },
    onSubmit: async (formValues) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      handleChange({ target: { name: 'package', value: selectedPackage } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [isModalOpen, selectedPackage, handleChange]);
  
  const handleClose = useCallback(() => {
    closeModal();
    setTimeout(resetForm, 300); // Reset form after transition
  }, [closeModal, resetForm]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            handleClose();
        }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60"
          onClick={handleClose}
          aria-hidden="true"
        />
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative bg-surface-base rounded-2xl w-full max-w-lg p-8 shadow-xl"
        >
          <button onClick={handleClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600" aria-label="סגור חלון">
            <X />
          </button>
          <h2 id="contact-modal-title" className="text-2xl font-bold text-brand-gray-900 mb-2">יצירת קשר</h2>
          <p className="text-brand-gray-700 mb-6">השאירו פרטים ונחזור אליכם בהקדם.</p>
          
          {status === 'success' ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold text-green-500">תודה!</h3>
              <p className="mt-2">{message}</p>
              <button onClick={handleClose} className="mt-6 bg-brand-gray-900 text-white px-6 py-2 rounded-lg font-semibold">סגירה</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="_gotcha" style={{ display: 'none' }} onChange={handleChange} value={values._gotcha} tabIndex={-1} autoComplete="off" />
              {values.package && <input type="hidden" name="package" value={values.package} />}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-gray-700 mb-1">שם מלא</label>
                <input type="text" name="name" id="name" required value={values.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue-300 focus:border-brand-blue-300"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-gray-700 mb-1">אימייל</label>
                <input type="email" name="email" id="email" required value={values.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue-300 focus:border-brand-blue-300"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-700 mb-1">טלפון</label>
                <input type="tel" name="phone" id="phone" required value={values.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue-300 focus:border-brand-blue-300"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-gray-700 mb-1">הודעה</label>
                <textarea name="message" id="message" rows={4} value={values.message} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue-300 focus:border-brand-blue-300"></textarea>
              </div>
              {status === 'error' && <p className="text-red-500 text-sm">{message}</p>}
              <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-gray-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-brand-gray-700 transition-colors disabled:bg-gray-400">
                {status === 'loading' ? 'שולח...' : 'שליחה'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;