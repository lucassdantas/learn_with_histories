export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LinguaStories",
    description: "Master languages through immersive storytelling with instant translations.",
    url: "https://linguastories.com",
    applicationCategory: "EducationApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "LinguaStories",
      url: "https://linguastories.com",
    },
    inLanguage: ["pt", "en", "fr"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
