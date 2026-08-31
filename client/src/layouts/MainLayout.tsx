// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white/90 backdrop-blur-sm transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;