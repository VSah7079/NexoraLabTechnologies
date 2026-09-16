import { Route, Routes, Navigate } from "react-router-dom";
import SEO from "@/components/common/SEO";

// ============================================
// HOME COMPONENTS
// ============================================
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

// ✅ Career Page Import
import Careers from "@/components/home/Careers";

// ============================================
// STANDALONE PAGES (Direct Imports)
// ============================================
import Landing from "../pages/Landing/Landing";
import AboutUs from "../pages/About/AboutUs";
import ServicesPage from "../pages/Services/ServicesPage";
import PortfolioPage from "../pages/Portfolio/PortfolioPage";
import SolutionsPage from "../pages/Solutions/SolutionsPage";
import ProductsPage from "../pages/Products/ProductsPage";
import ResourcesPage from "../pages/Resources/ResourcesPage";
import InsightsPage from "../pages/Insights/InsightsPage";
import ContactPage from "../pages/Contact/ContactPage";
import QuotePage from "../pages/Quote/QuotePage";
import Meeting from "../pages/Meeting/Meeting";

// ✅ Legal & Policy Pages
import PrivacyPolicy from "../pages/Legal/PrivacyPolicy";
import TermsOfService from "../pages/Legal/TermsOfService";
import RefundPolicy from "../pages/Legal/RefundPolicy";

// ✅ AI Feature Pages
import ResumeAnalyzer from "../pages/ResumeAnalyzer/ResumeAnalyzer";
import ATSScore from "../pages/ATSScore/ATSScore";
import ResumeBuilder from "../pages/ResumeBuilder/ResumeBuilder";
import PortfolioBuilder from "../pages/PortfolioBuilder/PortfolioBuilder";
import SkillGap from "../pages/SkillGap/SkillGap";
import CareerCoach from "../pages/CareerCoach/CareerCoach";
import SalaryPrediction from "../pages/SalaryPrediction/SalaryPrediction";
import Interview from "../pages/Interview/Interview";

// ✅ Admin Panel Pages
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminSubmissions from "../pages/Admin/AdminSubmissions";
import AdminServicesCMS from "../pages/Admin/AdminServicesCMS";
import AdminProductsCMS from "../pages/Admin/AdminProductsCMS";
import AdminPortfolioCMS from "../pages/Admin/AdminPortfolioCMS";
import AdminInsightsCMS from "../pages/Admin/AdminInsightsCMS";
import AdminSettings from "../pages/Admin/AdminSettings";

// ============================================
// COMPONENTS
// ============================================

// Home Page - All Sections Combined
const HomePage = () => (
  <>
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
  </>
);

// HomePage SEO wrapper for root "/" path
const HomePageWithSEO = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NexoraLab Technologies",
    "alternateName": ["NexoraLab", "NexoraLab Tech", "Nexora Lab Technologies"],
    "url": "https://nexoralabtechnologies.in",
    "logo": "https://nexoralabtechnologies.in/Circlelogo.png",
    "description": "Premier software engineering & AI solutions agency headquartered in Siwan, Bihar, India. Specializing in custom full-stack web development, mobile apps, enterprise cloud systems, and AI hiring suites.",
    "founder": {
      "@type": "Person",
      "name": "Vikram Sah"
    },
    "foundingLocation": {
      "@type": "Place",
      "name": "Siwan, Bihar, India"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Siwan",
      "addressLocality": "Siwan",
      "addressRegion": "Bihar",
      "postalCode": "841226",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 7079884369",
      "contactType": "customer service",
      "email": "nexoralabtechnologies@gmail.com",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/135297535/",
      "https://www.instagram.com/nexoralabtechnology/",
      "https://www.facebook.com/profile.php?id=61592465423073",
      "https://www.youtube.com/@NexoraLabTechnologies",
      "https://x.com/nexoralab"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NexoraLab Technologies",
    "image": "https://nexoralabtechnologies.in/Circlelogo.png",
    "url": "https://nexoralabtechnologies.in",
    "telephone": "+91 7079884369",
    "email": "nexoralabtechnologies@gmail.com",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Siwan",
      "addressLocality": "Siwan",
      "addressRegion": "Bihar",
      "postalCode": "841226",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.2196",
      "longitude": "84.3567"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NexoraLab Technologies",
    "url": "https://nexoralabtechnologies.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nexoralabtechnologies.in/services?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const homeKeywords = [
    "NexoraLab Technologies",
    "NexoraLab",
    "software company in Siwan",
    "software company in Bihar",
    "best IT company in Bihar",
    "IT company in Siwan Bihar",
    "custom software development company India",
    "full stack web development company",
    "React 19 Next.js web application development",
    "Flutter mobile app development India",
    "React Native app developers Bihar",
    "AI software development company",
    "smart AI hiring platform",
    "ATS resume analyzer AI",
    "free ATS score checker",
    "AI mock interview tool online",
    "cloud DevOps AWS architecture services",
    "hire dedicated software developers India",
    "enterprise ERP CRM software solutions",
    "Vikram Sah NexoraLab",
    "software engineering agency Siwan",
  ];

  return (
    <>
      <SEO
        title="NexoraLab Technologies | AI-Powered Smart Hiring & Custom Software Solutions"
        description="NexoraLab Technologies is a premier software engineering & AI company in Siwan, Bihar, India. We build custom enterprise web apps, mobile solutions, cloud DevOps systems, and smart AI talent intelligence suites."
        keywords={homeKeywords}
        schema={[orgSchema, localBusinessSchema, websiteSchema]}
      />
      <HomePage />
    </>
  );
};

// HomePage SEO wrapper for duplicate "/home" path
const HomeRouteWrapper = () => (
  <>
    <SEO
      title="NexoraLab Technologies | AI-Powered Smart Hiring & Custom Software Solutions"
      description="NexoraLab Technologies builds custom enterprise software, mobile apps, CRM/ERP platforms, and AI hiring solutions (Resume Analyzer, ATS Check, Mock Interviews) to scale your business."
      keywords={[
        "NexoraLab Technologies",
        "software company in Siwan Bihar",
        "custom software development",
        "web application development",
        "AI solutions Bihar",
      ]}
      canonical="https://nexoralabtechnologies.in"
    />
    <HomePage />
  </>
);

const NotFound = () => (
  <div className="flex min-h-[75vh] items-center justify-center bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20 px-4">
    <SEO
      title="404 - Page Not Found | NexoraLab Technologies"
      description="The page you are looking for does not exist on NexoraLab Technologies."
      robots="noindex, follow"
    />
    <div className="text-center rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl max-w-lg w-full">
      <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">404</h1>
      <p className="mt-4 text-2xl font-bold text-white">Page Not Found</p>
      <p className="mt-2 text-sm text-slate-300">The page you are looking for doesn't exist or has been moved.</p>
      <a 
        href="/" 
        className="mt-8 inline-block rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

// ============================================
// MAIN ROUTES
// ============================================
const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ HOME ROUTES */}
      <Route path="/" element={<HomePageWithSEO />} />
      <Route path="/home" element={<HomeRouteWrapper />} />
      <Route path="/landing" element={<Landing />} />
      
      {/* ✅ ABOUT ROUTE */}
      <Route path="/about" element={<AboutUs />} />
      
      {/* ✅ SERVICES & DIVISIONS ROUTES */}
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/divisions" element={<ServicesPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      
      {/* ✅ PORTFOLIO & PROJECTS ROUTE */}
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/projects" element={<PortfolioPage />} />
      
      {/* ✅ CAREERS & INSIGHTS ROUTE */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/insights" element={<InsightsPage />} />
      
      {/* ✅ CONTACT & QUOTE ROUTES */}
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/quote" element={<QuotePage />} />
      <Route path="/request-quote" element={<QuotePage />} />
      
      {/* ✅ MEETING ROUTE */}
      <Route path="/meeting" element={<Meeting />} />
      
      {/* ✅ LEGAL & POLICY ROUTES */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/terms-and-conditions" element={<TermsOfService />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/refund" element={<RefundPolicy />} />
      <Route path="/cancellation-refund" element={<RefundPolicy />} />
      
      {/* ✅ AI FEATURE ROUTES */}
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="/ats-score" element={<ATSScore />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
      <Route path="/skill-gap" element={<SkillGap />} />
      <Route path="/career-coach" element={<CareerCoach />} />
      <Route path="/salary-prediction" element={<SalaryPrediction />} />
      <Route path="/interview" element={<Interview />} />

      {/* ✅ ADMIN PANEL ROUTES */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="/admin/submissions" element={<AdminSubmissions />} />
      <Route path="/admin/services" element={<AdminServicesCMS />} />
      <Route path="/admin/products" element={<AdminProductsCMS />} />
      <Route path="/admin/portfolio" element={<AdminPortfolioCMS />} />
      <Route path="/admin/insights" element={<AdminInsightsCMS />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      
      {/* ✅ 404 - MUST BE LAST */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;