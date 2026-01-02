import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Workflow from "@/components/Workflow";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Hero />
      <Gallery />
      <Services />
      <About />
      <Testimonials />
      <Workflow />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
