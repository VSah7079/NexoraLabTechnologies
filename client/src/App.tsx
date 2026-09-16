// src/App.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/layouts/Navbar/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import Footer from "@/layouts/Footer/Footer";
import NetworkBackground from "@/components/common/NetworkBackground";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { ModalProvider } from "@/context/ModalContext";
import RequestQuoteModal from "@/components/modals/RequestQuoteModal";
import BrochureModal from "@/components/modals/BrochureModal";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Pure isolated Admin Console (Zero public elements, Navbar, Footer, or WhatsApp widgets)
  if (isAdminRoute) {
    return (
      <ModalProvider>
        <main className="min-h-screen bg-[#02050e] text-slate-100">
          <AppRoutes />
        </main>
      </ModalProvider>
    );
  }

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