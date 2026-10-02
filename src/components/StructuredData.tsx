import { SITE_NAME, SITE_URL } from "@/app/lib/seo";
import JsonLd from "@/components/JsonLd";

// Site-wide structured data (rendered once in the root layout).
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Learn languages by reading short stories with paragraph-by-paragraph translations.",
    inLanguage: ["en", "pt", "fr", "es"],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return <JsonLd data={schema} />;
}
