import Hero from "@/components/about/Hero";
import SmallButMighty from "@/components/about/SmallButMighty";
import Values from "@/components/about/Values";
import PreFooter from "@/components/home/PreFooter";
import Testimonials from "@/components/home/Testimonials";

const ABOUT_TESTIMONIALS = [
  {
    text: '"Marketinix redesigned our website and aligned our SEO strategy around real business goals. We saw higher-quality leads and stronger conversion performance within the first quarter."',
    name: "Operations Director",
    role: "US Home Services Brand",
  },
  {
    text: '"Their team understands both design and growth. They improved our site experience, tightened our messaging, and helped us build a much stronger digital presence in the USA market."',
    name: "Marketing Manager",
    role: "US Professional Services Firm",
  },
  {
    text: '"From web development to performance marketing, Marketinix delivered with clarity and consistency. Communication was transparent and every milestone stayed on track."',
    name: "Founder",
    role: "US Startup",
  },
  {
    text: '"What stood out most was their strategic mindset. They did not just execute tasks. They helped us prioritize the right channels and improve measurable ROI."',
    name: "Growth Lead",
    role: "US E-commerce Company",
  },
  {
    text: '"Marketinix operates like a true partner. Their combination of UX, development, and digital marketing support gave us a scalable system for long-term growth."',
    name: "Business Development Head",
    role: "US B2B Brand",
  },
];

export const metadata = {
  title: "About Marketinix | Digital Marketing Agency in USA",
  description:
    "Marketinix is a results-focused digital marketing agency in USA helping brands grow through web design, web development, SEO, social media marketing, and graphic design.",
  keywords: [
    "about Marketinix",
    "digital marketing agency in USA",
    "web designing services in USA",
    "web development services in USA",
    "SEO services in USA",
    "social media marketing services in USA",
    "graphic designing services in USA",
  ],
};

const AboutPage = () => {
  return (
    <>
      <Hero />
      <SmallButMighty />
      <Values />
      <Testimonials
        overline="Client Feedback"
        title="How USA brands describe working with Marketinix"
        items={ABOUT_TESTIMONIALS}
      />
      <PreFooter />
    </>
  );
};

export default AboutPage;
