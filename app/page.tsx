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
import { MagneticContactFab } from "@/components/chrome/magnetic-contact-fab"
import { nicheThemes } from "@/lib/niche-config"
import { ChatAssistant } from "@/components/chat-assistant"

export default function Page() {
  return (
    <main className="relative">
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
      <MagneticContactFab tier="premium" theme={nicheThemes.tech} />
      <ChatAssistant />
    </main>
  )
}
