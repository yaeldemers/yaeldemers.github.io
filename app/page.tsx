import HeroSection from "@/components/hero-section"
import BioSection from "@/components/bio-section"
import TechnicalProjects from "@/components/technical-projects"
import ResearchProjects from "@/components/research-projects"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import ConsultingSection from "@/components/consulting-section"

export default function Home() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <div className="relative">
        <BioSection />
        <TechnicalProjects />
        <ResearchProjects />
        <ConsultingSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
