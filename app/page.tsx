import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ReportPreview from "./components/ReportPreview";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Geo from "./components/Geo";
import FAQ from "./components/FAQ";
import Cases from "./components/Cases";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>
      <Navbar />
      <Hero />
      <ReportPreview />
      <Services />
      <Stats />
      <Geo />
      <FAQ />
      <Cases />
      <Articles />
      <Contact />
      <Footer />
    </main>
  );
}
