import React from "react";
import { motion } from "framer-motion";
import {
  Hero,
  TrustedCompanies,
  About,
  Services,
  Process,
  Portfolio,
  Industries,
  WhyChooseUs,
  TechnologyPartners,
  Insights,
  FAQ,
  ContactCTA,
} from "@/components/home";

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trusted By / Client Logos */}
      <TrustedCompanies />

      {/* 3. Why Partner / About */}
      <About />

      {/* 4. Core Services Matrix Grid */}
      <Services />

      {/* 5. How We Work Process */}
      <Process />

      {/* 6. Featured Case Studies Tabbed Showcase */}
      <Portfolio />

      {/* 7. Industries & Who We Work With */}
      <Industries />

      {/* 8. Why Businesses Choose NexoraLab */}
      <WhyChooseUs />

      {/* 9. Official Tech Partners */}
      <TechnologyPartners />

      {/* 10. Insights & Blog Articles */}
      <Insights />

      {/* 11. Software Development FAQ */}
      <FAQ />

      {/* 12. Pre-Footer Solo CTA Banner */}
      <ContactCTA />
    </motion.div>
  );
};

export default Home;