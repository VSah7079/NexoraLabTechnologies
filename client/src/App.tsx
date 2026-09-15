// src/App.tsx
import React from "react";
import Navbar from "@/layouts/Navbar/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import Footer from "@/layouts/Footer/Footer";
import NetworkBackground from "@/components/common/NetworkBackground";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { ModalProvider } from "@/context/ModalContext";
import RequestQuoteModal from "@/components/modals/RequestQuoteModal";
import BrochureModal from "@/components/modals/BrochureModal";

function App() {
  return (
    <ModalProvider>
      <NetworkBackground />
      <Navbar />
      <main className="min-h-screen bg-transparent text-slate-100 transition-colors duration-300">
        <AppRoutes />
      </main>
      <Footer />

      {/* Global Interactive Modals & Widgets */}
      <RequestQuoteModal />
      <BrochureModal />
      <FloatingWhatsApp />
    </ModalProvider>
  );
}

export default App;