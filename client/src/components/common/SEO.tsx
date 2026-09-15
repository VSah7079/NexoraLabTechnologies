// src/components/common/SEO.tsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE } from "@/constants/site";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  robots?: "index, follow" | "noindex, nofollow" | "noindex, follow";
  schema?: Record<string, unknown> | Record<string, unknown>[];
  author?: string;
}

const defaultKeywords = [
  "NexoraLab Technologies",
  "software company in Siwan Bihar",
  "best IT company in Bihar",
  "custom software development company India",
  "full stack web development",
  "React Next.js development agency",
  "mobile app development Flutter React Native",
  "AI software solutions",
  "ATS resume score checker AI",
  "cloud DevOps AWS architecture",
  "hire dedicated software engineers",
  "enterprise ERP CRM software solutions",
  "smart AI hiring platform",
  "software developers in Siwan",
];

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
  robots = "index, follow",
  schema,
  author = "NexoraLab Technologies",
}: SEOProps) => {
  const location = useLocation();

  // Normalize site url by removing trailing slash if present
  const baseSiteUrl = SITE.website.replace(/\/+$/, "");
  
  // Normalize current pathname and strip trailing slash consistently
  let cleanPathname = location.pathname;
  if (cleanPathname !== "/" && cleanPathname.endsWith("/")) {
    cleanPathname = cleanPathname.slice(0, -1);
  }

  // Construct absolute canonical URL pointing to the production domain
  const canonicalUrl = canonical || `${baseSiteUrl}${cleanPathname}`;
  
  // Set default social image served from public root
  const ogImageUrl = image || `${baseSiteUrl}/Circlelogo.png`;

  // Process keywords array or string
  const keywordsString = keywords
    ? Array.isArray(keywords)
      ? keywords.join(", ")
      : keywords
    : defaultKeywords.join(", ");

  // Format schema as JSON-LD injection
  const schemaMarkup = schema
    ? Array.isArray(schema)
      ? schema.map((s) => JSON.stringify(s))
      : [JSON.stringify(schema)]
    : [];

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      <meta name="publisher" content="NexoraLab Technologies" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geo & Location Metadata for Top Local Search & Discovery */}
      <meta name="geo.region" content="IN-BR" />
      <meta name="geo.placename" content="Siwan, Bihar, India" />
      <meta name="geo.position" content="26.2196;84.3567" />
      <meta name="ICBM" content="26.2196, 84.3567" />

      {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nexoralab" />
      <meta name="twitter:creator" content="@nexoralab" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Structured Data / JSON-LD Schema */}
      {schemaMarkup.map((jsonStr, idx) => (
        <script key={`schema-jsonld-${idx}`} type="application/ld+json">
          {jsonStr}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
