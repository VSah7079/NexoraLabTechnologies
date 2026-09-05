// src/App.tsx - Without Router
import Navbar from "@/layouts/Navbar/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import Footer from "@/layouts/Footer/Footer";
import NetworkBackground from "@/components/common/NetworkBackground";

function App() {
  return (
    <>
      <NetworkBackground />
      <Navbar />
      <main className="pt-24 md:pt-28 min-h-screen bg-transparent text-slate-100 transition-colors duration-300">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;