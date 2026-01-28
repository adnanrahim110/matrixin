import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

export const metadata = {
  title: "Contact Us | Matrixin",
  description:
    "Contact Matrixin for branding, website design, and UX/UI projects.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
