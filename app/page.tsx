import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="main-shell">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Results />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
