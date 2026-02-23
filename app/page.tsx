import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import ThemeTransition from "@/components/ThemeTransition";
import Marquee from "@/components/Marquee";

export default function HomePage() {
  return (
    <main className="main-shell">
      <ThemeTransition />
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Results />
      <Marquee />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
