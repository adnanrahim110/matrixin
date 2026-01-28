import Hero from "@/components/about/Hero";
import SmallButMighty from "@/components/about/SmallButMighty";
import Values from "@/components/about/Values";
import PreFooter from "@/components/home/PreFooter";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "About Us | Matrixin",
  description:
    "A people-first digital studio who build with heart. Meet our team and discover our mission and values.",
};

const AboutPage = () => {
  return (
    <>
      <Hero />
      <SmallButMighty />
      <Values />
      <Testimonials />
      <PreFooter />
    </>
  );
};

export default AboutPage;
