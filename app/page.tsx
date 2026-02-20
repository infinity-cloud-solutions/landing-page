import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

function PlaceholderSection({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="section-wrap border-t border-white/5">
      <p className="eyebrow">Coming next</p>
      <h2 className="section-title mt-4 text-3xl">{title}</h2>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="main-shell">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <PlaceholderSection id="results" title="Results section" />
      <PlaceholderSection id="about" title="About section" />
      <PlaceholderSection id="contact" title="Contact section" />
    </main>
  );
}
