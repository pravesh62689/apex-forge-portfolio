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
import { Intro } from "@/components/intro"

export default function Page() {
  return (
    <main className="relative">
      <Intro />
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
    </main>
  )
}
