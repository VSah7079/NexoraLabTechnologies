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
import SEO from "@/components/common/SEO";

const Landing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Exceptional Digital Product Engineering | NexoraLab Technologies"
        description="Scale your operations with modern web design, mobile app development, cloud infrastructure, and custom AI software solutions tailored to your startup or enterprise."
        canonical="https://nexoralabtechnologies.in/landing"
      />
      <Hero />
      <TrustedCompanies />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Industries />
      <WhyChooseUs />
      <TechnologyPartners />
      <Insights />
      <FAQ />
      <ContactCTA />
    </motion.div>
  );
};

export default Landing;