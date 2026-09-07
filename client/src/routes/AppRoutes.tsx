import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import SEO from "@/components/common/SEO";

// ============================================
// HOME COMPONENTS (Direct Import)
// ============================================
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

// ✅ Career Page Import - components/home se
import Careers from "@/components/home/Careers";

// ============================================
// PAGE COMPONENTS (Lazy Loaded)
// ============================================
const Landing = lazy(() => import("../pages/Landing/Landing"));

// ✅ Auth Pages
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const VerifyOTP = lazy(() => import("../pages/Auth/VerifyOTP"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail"));

// ✅ Candidate Pages
const CandidateDashboard = lazy(() => import("../pages/Candidate/Dashboard"));
const CandidateProfile = lazy(() => import("../pages/Candidate/Profile"));
const CandidateJobs = lazy(() => import("../pages/Candidate/Jobs"));
const CandidateApplications = lazy(() => import("../pages/Candidate/Applications"));

// ✅ Recruiter Pages
const RecruiterDashboard = lazy(() => import("../pages/Recruiter/Dashboard"));
const RecruiterJobs = lazy(() => import("../pages/Recruiter/Jobs"));
const RecruiterCandidates = lazy(() => import("../pages/Recruiter/Candidates"));

// ✅ Company Pages
const CompanyDashboard = lazy(() => import("../pages/Company/Dashboard"));
const CompanyProfile = lazy(() => import("../pages/Company/Profile"));

// ✅ Admin Pages
const AdminDashboard = lazy(() => import("../pages/Admin/Dashboard"));
const AdminUsers = lazy(() => import("../pages/Admin/Users"));
const AdminJobs = lazy(() => import("../pages/Admin/Jobs"));
const AdminCompanies = lazy(() => import("../pages/Admin/Companies"));

// ✅ Super Admin Pages
const SuperAdminDashboard = lazy(() => import("../pages/SuperAdmin/Dashboard"));
const SuperAdminSettings = lazy(() => import("../pages/SuperAdmin/Settings"));

// ✅ AI Feature Pages
const ResumeAnalyzer = lazy(() => import("../pages/ResumeAnalyzer/ResumeAnalyzer"));
const ATSScore = lazy(() => import("../pages/ATSScore/ATSScore"));
const ResumeBuilder = lazy(() => import("../pages/ResumeBuilder/ResumeBuilder"));
const PortfolioBuilder = lazy(() => import("../pages/PortfolioBuilder/PortfolioBuilder"));
const SkillGap = lazy(() => import("../pages/SkillGap/SkillGap"));
const CareerCoach = lazy(() => import("../pages/CareerCoach/CareerCoach"));
const SalaryPrediction = lazy(() => import("../pages/SalaryPrediction/SalaryPrediction"));
const Interview = lazy(() => import("../pages/Interview/Interview"));

// ✅ Meeting Page
const Meeting = lazy(() => import("../pages/Meeting/Meeting"));

// ============================================
// COMPONENTS
// ============================================
const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-transparent">
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-800 bg-[#060b18]/80 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00D2FF] border-t-transparent shadow-[0_0_20px_rgba(0,210,255,0.4)]"></div>
      <p className="text-slate-300 text-sm font-semibold tracking-wider uppercase">Loading...</p>
    </div>
  </div>
);

// Home Page - All Sections Combined
const HomePage = () => (
  <>
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
  </>
);

// HomePage SEO wrapper for root "/" path
const HomePageWithSEO = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NexoraLab Technologies",
    "url": "https://nexoralabtechnologies.in",
    "logo": "https://nexoralabtechnologies.in/Circlelogo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 7079884369",
      "contactType": "customer service",
      "email": "info@nexoralabtechnologies.in"
    },
    "sameAs": [
      "https://www.linkedin.com/company/135297535/",
      "https://www.instagram.com/nexoralabtechnology/",
      "https://www.facebook.com/profile.php?id=61592465423073",
      "https://www.youtube.com/@NexoraLabTechnologies",
      "https://x.com/nexoralab"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NexoraLab Technologies",
    "url": "https://nexoralabtechnologies.in"
  };

  return (
    <>
      <SEO
        title="NexoraLab Technologies | AI-Powered Smart Hiring & Custom Software Solutions"
        description="NexoraLab Technologies builds custom enterprise software, mobile apps, CRM/ERP platforms, and AI hiring solutions (Resume Analyzer, ATS Check, Mock Interviews) to scale your business."
        schema={[orgSchema, websiteSchema]}
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
      canonical="https://nexoralabtechnologies.in"
    />
    <HomePage />
  </>
);

// SEO Wrapper for restricted Auth pages
const AuthRouteWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <>
    <SEO
      title={`${title} | NexoraLab Technologies`}
      description="Secure account access and authentication panel for NexoraLab Technologies."
      robots="noindex, nofollow"
    />
    {children}
  </>
);

// SEO Wrapper for restricted Dashboard pages
const DashboardRouteWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <>
    <SEO
      title={`${title} | NexoraLab Dashboard`}
      description="Private dashboard workspace console for NexoraLab Technologies."
      robots="noindex, nofollow"
    />
    {children}
  </>
);

// 404 Page with noindex
const NotFound = () => (
  <div className="flex min-h-[70vh] items-center justify-center bg-transparent px-4">
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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ✅ HOME ROUTES */}
        <Route path="/" element={<HomePageWithSEO />} />
        <Route path="/home" element={<HomeRouteWrapper />} />
        <Route path="/landing" element={<Landing />} />
        
        {/* ✅ ABOUT ROUTE */}
        <Route path="/about" element={<About />} />
        
        {/* ✅ SERVICES & DIVISIONS ROUTES */}
        <Route path="/services" element={<Services />} />
        <Route path="/divisions" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        
        {/* ✅ PORTFOLIO & PROJECTS ROUTE */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Portfolio />} />
        
        {/* ✅ CAREERS & INSIGHTS ROUTE */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/insights" element={<Careers />} />
        
        {/* ✅ CONTACT ROUTE */}
        <Route path="/contact" element={<ContactCTA />} />
        
        {/* ✅ MEETING ROUTE */}
        <Route path="/meeting" element={<Meeting />} />
        
        {/* ✅ AUTH ROUTES */}
        <Route path="/login" element={<AuthRouteWrapper title="Login"><Login /></AuthRouteWrapper>} />
        <Route path="/register" element={<AuthRouteWrapper title="Register"><Register /></AuthRouteWrapper>} />
        <Route path="/forgot-password" element={<AuthRouteWrapper title="Forgot Password"><ForgotPassword /></AuthRouteWrapper>} />
        <Route path="/reset-password" element={<AuthRouteWrapper title="Reset Password"><ResetPassword /></AuthRouteWrapper>} />
        <Route path="/verify-otp" element={<AuthRouteWrapper title="Verify OTP"><VerifyOTP /></AuthRouteWrapper>} />
        <Route path="/verify-email" element={<AuthRouteWrapper title="Verify Email"><VerifyEmail /></AuthRouteWrapper>} />
        
        {/* ✅ CANDIDATE ROUTES */}
        <Route path="/candidate/dashboard" element={<DashboardRouteWrapper title="Candidate Dashboard"><CandidateDashboard /></DashboardRouteWrapper>} />
        <Route path="/candidate/profile" element={<DashboardRouteWrapper title="Candidate Profile"><CandidateProfile /></DashboardRouteWrapper>} />
        <Route path="/candidate/jobs" element={<DashboardRouteWrapper title="Candidate Jobs"><CandidateJobs /></DashboardRouteWrapper>} />
        <Route path="/candidate/applications" element={<DashboardRouteWrapper title="Candidate Applications"><CandidateApplications /></DashboardRouteWrapper>} />
        
        {/* ✅ RECRUITER ROUTES */}
        <Route path="/recruiter/dashboard" element={<DashboardRouteWrapper title="Recruiter Dashboard"><RecruiterDashboard /></DashboardRouteWrapper>} />
        <Route path="/recruiter/jobs" element={<DashboardRouteWrapper title="Recruiter Jobs"><RecruiterJobs /></DashboardRouteWrapper>} />
        <Route path="/recruiter/candidates" element={<DashboardRouteWrapper title="Recruiter Candidates"><RecruiterCandidates /></DashboardRouteWrapper>} />
        
        {/* ✅ COMPANY ROUTES */}
        <Route path="/company/dashboard" element={<DashboardRouteWrapper title="Company Dashboard"><CompanyDashboard /></DashboardRouteWrapper>} />
        <Route path="/company/profile" element={<DashboardRouteWrapper title="Company Profile"><CompanyProfile /></DashboardRouteWrapper>} />
        
        {/* ✅ ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<DashboardRouteWrapper title="Admin Dashboard"><AdminDashboard /></DashboardRouteWrapper>} />
        <Route path="/admin/users" element={<DashboardRouteWrapper title="Admin Users"><AdminUsers /></DashboardRouteWrapper>} />
        <Route path="/admin/jobs" element={<DashboardRouteWrapper title="Admin Jobs"><AdminJobs /></DashboardRouteWrapper>} />
        <Route path="/admin/companies" element={<DashboardRouteWrapper title="Admin Companies"><AdminCompanies /></DashboardRouteWrapper>} />
        
        {/* ✅ SUPER ADMIN ROUTES */}
        <Route path="/super-admin/dashboard" element={<DashboardRouteWrapper title="Super Admin Dashboard"><SuperAdminDashboard /></DashboardRouteWrapper>} />
        <Route path="/super-admin/settings" element={<DashboardRouteWrapper title="Super Admin Settings"><SuperAdminSettings /></DashboardRouteWrapper>} />
        
        {/* ✅ AI FEATURE ROUTES */}
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/ats-score" element={<ATSScore />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/career-coach" element={<CareerCoach />} />
        <Route path="/salary-prediction" element={<SalaryPrediction />} />
        <Route path="/interview" element={<Interview />} />
        
        {/* ✅ 404 - MUST BE LAST */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;