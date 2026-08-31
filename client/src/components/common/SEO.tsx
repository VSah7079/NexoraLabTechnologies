// src/components/common/SEO.tsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE } from "@/constants/site";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  robots?: "index, follow" | "noindex, nofollow" | "noindex, follow";
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  robots = "index, follow",
  schema,
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
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
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
