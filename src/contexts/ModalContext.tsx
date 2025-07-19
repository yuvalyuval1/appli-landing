import React, { useState, useCallback, createContext, ReactNode } from 'react';

// Modal Context
interface ModalContextType {
  isModalOpen: boolean;
  selectedPackage: string;
  openModal: (packageName?: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const openModal = useCallback((packageName = '') => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, selectedPackage, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
