import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

export const metadata = {
  title: "Contact Us | Marketinix",
  description:
    "Contact Marketinix for branding, website design, and UX/UI projects.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
