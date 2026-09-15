import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
  isBrochureModalOpen: boolean;
  openBrochureModal: () => void;
  closeBrochureModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  const openBrochureModal = () => setIsBrochureModalOpen(true);
  const closeBrochureModal = () => setIsBrochureModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        isBrochureModalOpen,
        openBrochureModal,
        closeBrochureModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
