// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-28 min-h-screen bg-transparent text-slate-100 transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;