import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import { Process } from '@/components/Process'
import { Results } from '@/components/Results'
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { FAQ } from '@/components/FAQ'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { FloatingChat } from '@/components/FloatingChat'
import { SmoothScroll } from '@/components/SmoothScroll'

export default function HomePage() {
  return (
    <SmoothScroll>
      <main className="main-shell">
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <Results />
        <About />
        <FAQ />
        <Contact />
        <Footer />
        <FloatingChat />
      </main>
    </SmoothScroll>
  )
}
