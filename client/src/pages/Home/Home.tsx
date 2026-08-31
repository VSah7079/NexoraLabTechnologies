import { motion } from "framer-motion";
import { 
  Hero, 
  About, 
  Services, 
  Portfolio, 
  Process, 
  Pricing, 
  Testimonials, 
  Industries, 
  Solutions, 
  Technologies, 
  TrustedCompanies, 
  FAQ, 
  ContactCTA 
} from "@/components/home";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <Industries />
      <Solutions />
      <Technologies />
      <TrustedCompanies />
      <FAQ />
      <ContactCTA />
    </motion.div>
  );
};

export default Home;