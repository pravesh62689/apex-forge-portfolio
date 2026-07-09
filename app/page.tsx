import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { Showcase } from "@/components/showcase"
import { Developer } from "@/components/developer"
import { Pricing } from "@/components/pricing"
import { Addons } from "@/components/addons"
import { Growth } from "@/components/growth"
import { Process } from "@/components/process"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { WhatsappFab } from "@/components/whatsapp-fab"
import { ChatAssistant } from "@/components/chat-assistant"

export default function Page() {
  // --- PRODUCTION LOCAL BUSINESS STRUCTURAL DATA ---
  const agencySchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Forge",
    "image": "https://apex-forge-portfolio.pages.dev/og-image.jpg", // Point to a branding snapshot
    "@id": "https://apex-forge-portfolio.pages.dev",
    "url": "https://apex-forge-portfolio.pages.dev",
    "telephone": "+916268935890", // Swap out with your active operational business contact line
    "priceRange": "INR ₹6,000 - ₹30,000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.5355", // Center pinpoint approximations for Noida geographic tracking
      "longitude": "77.3910"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Noida" },
      { "@type": "AdministrativeArea", "name": "Greater Noida" },
      { "@type": "AdministrativeArea", "name": "Delhi NCR" },
      { "@type": "AdministrativeArea", "name": "Gurugram" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59" // Demonstrates active continuous engineering intake channels
    },
    "sameAs": [
      "https://github.com/pravesh62689" // Add professional social links if applicable
    ]
  };

  return (
    <main className="relative">
      {/* Structural Data Injection for Instant Rich Snippet Mapping */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }}
      />

      <Navbar />
      <Hero />
      <TrustBar />
      <Showcase />
      <Developer />
      <Pricing />
      <Addons />
      <Growth />
      <Process />
      <Faq />
      <FinalCta />
      <WhatsappFab />
      <ChatAssistant />
    </main>
  )
}