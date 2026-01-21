import About from "@/components/home/About";
import Experience from "@/components/home/Experience";
import Faqs from "@/components/home/Faqs";
import Hero from "@/components/home/Hero";
import PreFooter from "@/components/home/PreFooter";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Work from "@/components/home/Work";

export default function Home() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-1 h-[calc(var(--vh,1vh)*100)] w-full max-w-[100vw] min-[1100px]:hidden"
      />
      <Hero />
      <Experience />
      <Work />
      <About />
      <Services />
      <Testimonials />
      <Faqs />
      <PreFooter />
    </div>
  );
}
